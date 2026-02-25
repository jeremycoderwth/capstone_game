import k from "./context";
import { characters, rationaleParagraphs } from "./lib/data";
import { mechanics, nuclearWasteLevel } from "./lib/data";
import { loadAssets } from "./lib/assets";
import { Player } from "./core/player";
import { WorldManager } from "./core/world";
import { QuizSystem } from "./core/quiz";
import { Level } from "./core/level";
import { GameManager, ProgressManager } from "./core/game";
import { RenderChunk } from "./core/chunk";
import { MapGenerator } from "./core/map-generator";
import type { AffectedArea, LEVELS } from "./lib/definitions";
import { levels, grassland } from "./lib/data";
import { initUser } from "./auth/auth-service";
import { showLoginUI } from "./components/auth-ui";
import { logout } from "./auth/auth-service";
import { gameSesionTracker, levelTracker } from "./trackers/game-log-tracker";
import { saveGameSession, saveLevelResult } from "./services/game-logs";
import { createButton } from "./core/utils";
import { userState } from "./lib/store";

loadAssets(); // load all assets

const progress = new GameManager(k);

k.scene("introduction", () => {
  let pageIndex = 0;
  const dialogBoxWidth = 900;
  const dialogBoxHeight = 500;

  // overlay
  k.add([
    k.rect(k.width(), k.height()),
    k.color(255, 255, 255),
    k.opacity(0.6),
    k.fixed(),
    "overlay"
  ]);

  // heading title
  k.add([
    k.text("RATIONALE", { size: 20, align: "center" }),
    k.pos(k.center().x, k.center().y - 210),
    k.anchor("center"),
    k.fixed(),
    k.color(0, 0, 0),
    k.z(3),
    "heading"
  ]);

  // dialog box or the bg
  k.add([
    k.rect(dialogBoxWidth, dialogBoxHeight, { radius: 15 }),
    k.pos(k.center()),
    k.anchor("center"),
    k.color(250, 255, 253),
    k.outline(4, new k.Color(25, 94, 6)),
    "dialogBox"
  ]);

  const paragpraph = k.add([
    k.text("", { size: 12, width: dialogBoxWidth - 80, align: "center", lineSpacing: 8 }),
    k.pos(k.center().x, k.center().y - 160),
    k.anchor("top"),
    k.color(40, 40, 40),
    "text"
  ]);

  const updateText = () => {
    paragpraph.text = rationaleParagraphs[pageIndex].text.trim();
  }

  updateText();

  // back button
  createButton("Back", k.center().x - 200, k.center().y + 200, () => {
    if (pageIndex > 0) {
      pageIndex--;
      updateText();
    }
  });

  // next button
  const nextBtn = createButton("Next", k.center().x + 200, k.center().y + 200, () => {
    if (pageIndex < rationaleParagraphs.length - 1) {
      pageIndex++;
      updateText();

      if (pageIndex === rationaleParagraphs.length - 1) {
        nextBtn.label.text = "I Agree";
      }
    } else {
      k.go("selection");
    }
  });
});

k.scene("selection", () => {
  let currentIndex = 0;

  // overlay 
  k.add([
    k.rect(900, 500, { radius: 20 }),
    k.pos(k.center()),
    k.anchor("center"),
    k.color(250, 251, 249),
    k.outline(4, new k.Color(27, 97, 7)),
    "overlay"
  ]);

  // heading
  k.add([
    k.text("SELECT YOUR PREFERED CHARACTER IN THE GAME", {
      size: 16,
      align: "center",
    }),
    k.pos(k.center().x, 100),
    k.anchor("center"),
    k.color(0, 0, 0),
    "heading",
  ]);

  let currentCharacter = k.add([
    k.sprite(characters[currentIndex].sprite),
    k.pos(k.center().x, 0),
    k.anchor("center"),
    k.scale(3),
  ]);

  const nameText = k.add([
    k.text(characters[currentIndex].id),
    k.pos(
      k.center().x,

      k.center().y + 100,
    ),
    k.anchor("center"),
    k.color(20, 30, 21),
    k.scale(0.5),
    "character-ui",
  ]);

  const showCharacter = (index: number) => {
    if (currentCharacter) {
      currentCharacter.destroy();
    }

    const data = characters[index];

    currentCharacter = k.add([
      k.sprite(data.sprite),
      k.pos(k.center().x, k.center().y),
      k.anchor("center"),
      k.scale(0.5),
    ]);

    nameText.text = data.id;
  };

  showCharacter(currentIndex);

  // left button
  const arrowLeft = k.add([
    k.sprite("arrowLeft"),
    k.pos(k.center().x - 160, k.center().y),
    k.anchor("center"),
    k.scale(1),
    k.area(),
  ]);

  arrowLeft.onClick(() => {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    showCharacter(currentIndex);
  });

  // right button
  const arrowRight = k.add([
    k.sprite("arrowRight"),
    k.pos(k.center().x + 160, k.center().y),
    k.anchor("center"),
    k.scale(1),
    k.area(),
  ]);

  arrowRight.onClick(() => {
    currentIndex = (currentIndex + 1) % characters.length;
    showCharacter(currentIndex);
  });

  // confirm button
  const confirm = k.add([
    k.rect(100, 40, { radius: 8 }),
    k.pos(k.center().x, k.center().y + 200),
    k.anchor("center"),
    k.area(),
    k.outline(3),
    k.color(225, 247, 218),
    "btn-ui",
  ]);

  confirm.add([
    k.text("CONFIRM", { size: 12, align: "center" }),
    k.anchor("center"),
    k.color(0, 0, 0),
    "btn-ui",
  ]);

  confirm.onClick(() => {
    const selected = characters[currentIndex];
    userState.selectedCharacter = selected;
    k.go("loading");
  });
});

k.scene("loading", () => {
  let dots = 0;
  let timer = 0;
  const speed = 0.4;

  const loadingText = k.add([
    k.text("Loading...", { size: 28 }),
    k.pos(k.center()),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  loadingText.onUpdate(() => {
    timer += k.dt();

    if (timer >= speed) {
      timer = 0;
      dots = (dots + 1) % 4;
      loadingText.text = "Loading" + ".".repeat(dots);
    }
  });

  k.wait(3, () => {
    k.go("instructions");
  });
});

k.scene("instructions", () => {
  const displayedMechanics = new Set<number>();
  const pad = 192;

  let mechanic = 0;

  // overlay
  k.add([
    k.rect(1100, 500, { radius: 15 }),
    k.anchor("center"),
    k.pos(k.center()),
    k.color(250, 251, 253),
    k.outline(4, new k.Color(28, 105, 6)),
    "overlay"
  ]);

  // heading title
  k.add([
    k.text("GAME MECHANICS", { size: 24 }),
    k.pos(k.center().x, 100),
    k.anchor("center"),
    k.color(0, 0, 0),
    "heading"
  ]);

  let currentMechanic = k.add([
    k.text(mechanics[mechanic].text, {
      size: 16,
      width: k.width() - pad * 2,
      align: "center",
      letterSpacing: 2,
      lineSpacing: 10,
    }),
    k.pos(k.center().x, 250),
    k.color(158, 156, 43),
    k.anchor("center"),
    "instruction",
  ]);

  const displayMechanic = (key: number) => {
    if (currentMechanic) {
      currentMechanic.destroy();
    }

    const textString = mechanics[key];

    k.wait(0.2, () => {
      currentMechanic = k.add([
        k.text(textString.text, {
          size: 16,
          width: k.width() - pad * 2,
          align: "center",
          letterSpacing: 2,
          lineSpacing: 10,
        }),
        k.pos(k.center().x, 250),
        k.color(158, 156, 43),
        k.anchor("center"),
      ]);
    });

    displayedMechanics.add(key);

    if (displayedMechanics.size === mechanics.length) {
      startButton.opacity = 1; // show start button when reached the end of mechanic
      startText.opacity = 1;
    }
  };

  displayMechanic(mechanic);

  // left button
  const arrowLeft = k.add([
    k.sprite("arrowLeftBold"),
    k.pos(k.center().x - 500, k.center().y),
    k.anchor("center"),
    k.scale(1),
    k.area(),
  ]);

  arrowLeft.onClick(() => {
    mechanic = (mechanic - 1 + mechanics.length) % mechanics.length;
    displayMechanic(mechanic);
  });

  // right button
  const arrowRight = k.add([
    k.sprite("arrowRightBold"),
    k.pos(k.center().x + 500, k.center().y),
    k.anchor("center"),
    k.scale(1),
    k.area(),
  ]);

  arrowRight.onClick(() => {
    mechanic = (mechanic + 1) % mechanics.length;
    displayMechanic(mechanic);
  });

  // start button (parent background object)
  const startButton = k.add([
    k.rect(140, 40, { radius: 8 }),
    k.pos(k.center().x, k.center().y + 180),
    k.anchor("center"),
    k.scale(1),
    k.outline(4),
    k.color(184, 252, 168),
    k.area(),
    k.opacity(0), // hidden first
  ]);

  // text for start button (child object)
  const startText = startButton.add([
    k.text("START", { size: 16 }),
    k.anchor("center"),
    k.color(0, 0, 0),
    k.opacity(0), // hidden first
  ]);

  startButton.onClick(() => {
    k.go("quest", 0, "Jeremy");
  });
});

k.scene("quest", (levelIndex: number) => {
  const currentConfig = levels[levelIndex];
  const selected = userState.selectedCharacter;

  const levelManager = new Level(nuclearWasteLevel, false);

  const world = new WorldManager(
    k,
    currentConfig.worldWidth,
    currentConfig.worldHeight,
    currentConfig.tileSize,
    currentConfig.worldTheme,
  );

  const steward = new Player(k, selected?.sprite || "boy", 200, userState.user.name);

  const worldPixelWidth = currentConfig.worldWidth * currentConfig.tileSize;
  const worldPixelHeight = currentConfig.worldHeight * currentConfig.tileSize;

  steward.setBounds(worldPixelWidth, worldPixelHeight);

  const waitHelper = (secs: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, secs * 1000);
    });
  };

  let cameraLocked = false;

  async function showImpactAt(tileX: number, tileY: number) {
    cameraLocked = true;
    const target = k.vec2(
      tileX * currentConfig.tileSize,
      tileY * currentConfig.tileSize,
    );
    const start = k.getCamPos();
    const duration = 0.4;
    const startTime = performance.now();

    await new Promise<void>((resolve) => {
      const move = () => {
        const elapsed = (performance.now() - startTime) / 1000;
        const t = Math.min(elapsed / duration, 1);

        const pos = k.lerp(start, target, t);

        k.setCamPos(pos);

        if (t < 1) {
          requestAnimationFrame(move);
        } else {
          setTimeout(() => {
            resolve();
          }, 400);
        }
      };

      move();
    });

    await waitHelper(0.5);
    cameraLocked = false;
  }

  const quiz = new QuizSystem(
    k,
    levelManager,
    world,
    currentConfig.questions,
    async () => {
      if (!quiz.isFinished()) return;

      const currentLevelIdx = progress.getCurrentLevel();
      const currentCateg = levels[currentLevelIdx].id;
      const levelResult = await levelTracker.buildLevelResult(currentCateg, currentLevelIdx + 1);
      levelResult.score = quiz.getScore();
      levelTracker.addLevel(levelResult);
      gameSesionTracker.addSession({
        playerId: levelResult.playerId,
        username: userState.user.name,
        totalScore: levelResult.score,
        timeSpent: 0,
        completedAt: levelResult.completedAt
      });
      await saveLevelResult(levelResult);
      ProgressManager.unlockLevel(currentLevelIdx + 1, userState.user.id);
      const nextLevelIdx = progress.getNextLevelIdx();

      if (nextLevelIdx !== null) {
        const nextCateg = levels[nextLevelIdx].id;

        k.go("level-transition", {
          completedCateg: currentCateg,
          nextCateg: nextCateg,
          nextLevelIdx: nextLevelIdx,
        });
      } else {
        const session = await gameSesionTracker.buildSession();
        await saveGameSession(session);
        gameSesionTracker.reset();
        levelTracker.reset();
        k.go("freestyle", levels);
      }
    },
    async (impact: AffectedArea, result: "correct" | "wrong") => {
      if (result === "correct") {
        await animateRestore(impact.x, impact.y, impact.radius);
      } else {
        await animateDamage(impact.x, impact.y, impact.radius);
      }
    },
    () => {
      k.go("game-over");
    },
  );

  k.add([
    k.text("Press SPACE to start the Quiz.", { size: 20 }),
    k.pos(k.center().x, 500),
    k.anchor("center"),
    k.fixed(),
    k.color(240, 243, 247),
    k.z(101),
    "ui",
  ]);

  k.onUpdate(() => {
    if (!cameraLocked) {
      k.setCamPos(steward.getPosition());
    }

    world.updateChunks(steward.getPosition());
  });

  k.onKeyPress("space", () => {
    k.destroyAll("ui");
    quiz.showCurrentQuestion();
  });

  async function animateRestore(cx: number, cy: number, radius: number = 1) {
    let hasDamage = false;

    for (let x = cx - radius; x <= cx + radius; x++) {
      for (let y = cy - radius; y <= cy + radius; y++) {
        if (world.getTile(x, y) === 1) {
          hasDamage = true;
          break;
        }
      }
    }

    if (!hasDamage) return;

    await showImpactAt(cx, cy);

    for (let x = cx - radius; x <= cx + radius; x++) {
      for (let y = cy - radius; y <= cy + radius; y++) {
        world.setTile(x, y, 0);
      }
    }
  }

  async function animateDamage(cx: number, cy: number, radius: number = 1) {
    await showImpactAt(cx, cy);
    for (let x = cx - radius; x <= cx + radius; x++) {
      for (let y = cy - radius; y <= cy + radius; y++) {
        world.setTile(x, y, 1);
      }
    }
  }
});

k.scene("game-over", () => {
  const overlay = k.add([
    k.rect(k.width(), k.height()),
    k.color(0, 0, 0),
    k.opacity(0.5),
    k.fixed(),
    "game-over",
  ]);

  overlay.add([
    k.text("GAME OVER", { size: 32 }),
    k.pos(k.center()),
    k.anchor("center"),
    k.fixed(),
    "game-over",
  ]);

  const restartBtn = k.add([
    k.rect(275, 50, { radius: 8 }),
    k.pos(k.center().x, k.center().y + 140),
    k.anchor("center"),
    k.area(),
    k.fixed(),
    "game-over",
  ]);

  restartBtn.add([
    k.text("RESTART LEVEL", { size: 18 }),
    k.color(0, 0, 0),
    k.anchor("center"),
    "game-over",
  ]);

  restartBtn.onClick(() => {
    k.destroyAll("game-over");
    progress.restartLevel();
  });
});

k.scene("freestyle", (levels?: LEVELS[]) => {
  const unlocked = ProgressManager.getUnlockedLevels(userState.user.id);
  const definedLevels = levels ?? [];
  const selected = userState.selectedCharacter;

  let currentTree = null;
  let dragOffset = k.vec2(0, 0);
  let isDragging = false;
  let dragSource = null;
  let pressedTree = null;
  let pressStartPos = null;
  const DRAG_THRESHOLD = 5;
  const generatedMap = new MapGenerator(
    grassland.worldWidth,
    grassland.worldHeight,
    grassland.tileSize,
    0,
  );
  const mapData = generatedMap.createDefaultMap();
  const grassLandRenderer = new RenderChunk(
    k,
    mapData,
    grassland.worldTheme,
    grassland.tileSize,
    10,
  );
  const planter = new Player(k, selected?.sprite || "boy", 200, userState.user.name);
  planter.setBounds(
    grassland.worldWidth * grassland.tileSize,
    grassland.worldHeight * grassland.tileSize,
  );

  const heading = k.add([
    k.text("CONGRATULATIONS! Please plant your preferred trees and have fun", {
      size: 16,
      align: "center",
      width: 600,
      lineSpacing: 6
    }),
    k.pos(k.center().x, 100),
    k.anchor("center"),
    k.fixed(),
    k.z(1005),
    "freestyle-ui",
    "heading",
  ]);

  k.wait(3, () => {
    heading.destroy();
  });

  const restartBtn = k.add([
    k.rect(220, 60, { radius: 999 }),
    k.pos(k.center().x + 450, k.center().y + 250),
    k.anchor("center"),
    k.area(),
    k.color(200, 50, 50),
    k.fixed(),
    k.z(1005),
    "btn",
  ]);

  restartBtn.add([
    k.text("RESTART GAME", { size: 12, align: "center" }),
    k.anchor("center"),
    "btn",
  ]);

  restartBtn.onClick(() => {
    ProgressManager.reset(userState.user.id);
    k.go("quest", 0, userState.user.name);
  });

  const logoutBtn = k.add([
    k.rect(100, 40, { radius: 12 }),
    k.pos(80, 40),
    k.anchor("center"),
    k.color(200, 183, 50),
    k.fixed(),
    k.outline(2),
    k.area(),
    k.z(1005),
    "btn"
  ]);

  logoutBtn.add([
    k.text("LOGOUT", { size: 14, align: "center" }),
    k.anchor("center"),
    "btn"
  ]);

  logoutBtn.onClick(() => {
    ProgressManager.reset(userState.user.id);
    userState.user.id = "";
    userState.user.name = "";
    userState.selectedCharacter = null;
    logout();
    k.go("redirection");
  });

  for (let i = 0; i < unlocked; i++) {
    if (!definedLevels[i]) continue;

    const btn = k.add([
      k.rect(200, 45, { radius: 15 }),
      k.pos(k.center().x + 500, 100 + i * 80),
      k.anchor("center"),
      k.area(),
      k.fixed(),
      k.outline(3),
      k.color(50, 200, 50),
      k.z(1005),
      "btn",
    ]);

    btn.add([
      k.text(`Level ${i + 1}: ${definedLevels[i].id ?? "Environment"}`, {
        size: 11,
        align: "center",
        width: 190,
      }),
      k.anchor("center"),
      "btn",
    ]);

    btn.onClick(() => {
      progress.startLevel(i, 0);
      k.go("quest", i);
    });
  }

  function createBaseTree(x: number, y: number, spriteName: string) {
    const baseTree = k.add([
      k.sprite(spriteName),
      k.pos(x, y),
      k.area({ shape: new k.Rect(k.vec2(0), 50, 70) }),
      k.anchor("center"),
      k.fixed(),
      k.z(1005),
      "base-tree",
      {
        treeSpriteType: spriteName,
      },
    ]);

    baseTree.onHoverUpdate(() => {
      if (k.isMouseDown() && !isDragging && !pressedTree) {
        pressedTree = baseTree;
        pressStartPos = k.mousePos();
      }
    });
  }

  k.onUpdate(() => {
    if (pressedTree && !isDragging && k.isMouseDown()) {
      const mouse = k.mousePos();
      const dist = mouse.dist(pressStartPos);

      if (dist > DRAG_THRESHOLD) {
        isDragging = true;
        dragSource = pressedTree;

        currentTree = k.add([
          k.sprite(pressedTree.treeSpriteType),
          k.anchor("center"),
          k.pos(k.toWorld(mouse)),
          k.area({ shape: new k.Rect(k.vec2(0, 10), 50, 50) }),
          k.z(5),
          "draggable",
        ]);

        currentTree.onCollide("player", () => {
          const infoBg = k.add([
            k.rect(190, 52, { radius: 12 }),
            k.pos(k.center().x, k.center().y - 100),
            k.anchor("center"),
            k.z(2000),
            k.outline(2),
            k.color(255, 255, 255),
            k.fixed(),
            "info",
          ]);

          infoBg.add([
            k.text("Planting trees are helpful to our environment!", {
              size: 10,
              align: "center",
              lineSpacing: 4,
              width: 180,
            }),
            k.anchor("center"),
            k.color(0, 0, 0),
            "info",
          ]);
        });

        currentTree.onCollideEnd("player", () => {
          k.destroyAll("info");
        });

        dragOffset = k.vec2(0, 0);
      }
    }

    if (isDragging && currentTree) {
      const mouse = k.mousePos();
      currentTree.pos = k.toWorld(mouse).sub(dragOffset);
    }
  });

  k.onMouseRelease(() => {
    if (isDragging && currentTree) {
      currentTree.unuse("draggable");
      currentTree.use("planted-tree");
    }

    isDragging = false;
    dragSource = null;
    currentTree = null;
    pressedTree = null;
    pressStartPos = null;
  });

  createBaseTree(80, 200, "tree_green_1");
  createBaseTree(80, 260, "tree_teal");
  createBaseTree(80, 340, "tree_rose");
  createBaseTree(80, 400, "tree_yellowish_green");
  createBaseTree(80, 460, "tree_red");

  const worldPixelWidth = grassland.worldWidth * grassland.tileSize;
  const worldPixelHeight = grassland.worldHeight * grassland.tileSize;

  k.onUpdate(() => {
    k.setCamPos(planter.getPosition());

    planter.setBounds(worldPixelWidth, worldPixelHeight);
    grassLandRenderer.update(planter.getPosition());
  });
});

k.scene(
  "level-transition",
  (data: {
    completedCateg: string;
    nextCateg: string;
    nextLevelIdx: number;
  }) => {
    // overlay
    const overlay = k.add([
      k.rect(k.width(), k.height()),
      k.color(104, 170, 255),
      k.fixed(),
      k.z(1000),
      "transition-ui",
    ]);

    // message
    overlay.add([
      k.text(`${data.completedCateg.toUpperCase()} LEVEL COMPLETE!`, {
        size: 24,
        align: "center",
      }),
      k.pos(k.center().x, k.center().y - 150),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.fixed(),
      "transition-ui",
    ]);

    // next level message
    overlay.add([
      k.text(`Next Level: ${data.nextCateg.toUpperCase()}`, {
        size: 20,
        align: "center",
      }),
      k.pos(k.center().x, k.center().y),
      k.anchor("center"),
      k.fixed(),
      k.color(255, 255, 255),
      "transition-ui",
    ]);

    // instruction
    const pressStart = overlay.add([
      k.text("Press SPACE to continue on next level", { size: 24 }),
      k.pos(k.center().x, k.center().y + 200),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.fixed(),
      k.opacity(),
      "transition-ui",
    ]);

    let visible = true;
    k.loop(0.6, () => {
      visible = !visible;
      pressStart.opacity = visible ? 1 : 0;
    });

    k.onKeyPress("space", () => {
      progress.nextLevel();
    });
  },
);

k.scene("redirection", () => {
  let dots = 0;
  let timer = 0;
  const speed = 0.4;

  // overlay
  const blank = k.add([
    k.rect(k.width(), k.height()),
    k.anchor("center"),
    k.pos(k.center()),
    k.color(9, 9, 13),
    "overlay"
  ]);

  // loadin text
  const loadingText = k.add([
    k.text("Redirecting...", { size: 28 }),
    k.pos(k.center()),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  loadingText.onUpdate(() => {
    timer += k.dt();

    if (timer >= speed) {
      timer = 0;
      dots = (dots + 1) % 4;
      loadingText.text = "Redirecting" + ".".repeat(dots);
    }
  });

  k.wait(2.5, async () => {
    await initGame();
    blank.destroy();
    loadingText.destroy();
  });
});

async function initGame() {
  await initUser();

  if (!userState.user.name) {
    return showLoginUI(initGame);
  }

  startGame();
}

function startGame() {
  const unlocked = ProgressManager.getUnlockedLevels(userState.user.id);

  if (!unlocked || unlocked <= 0) {
    k.go("introduction");
  } else {
    k.go("freestyle", levels, userState.user.name);
  }
}

initGame();