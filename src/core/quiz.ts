import type { KAPLAYCtx } from "kaplay";
import { WorldManager } from "./world";
import type { QuizQuestion, AffectedArea } from "../lib/definitions";
import { Level } from "./level";

export class QuizSystem {
    private canvas: KAPLAYCtx;
    private level: Level;
    private world: WorldManager;
    private questions: QuizQuestion[];
    private onLevelComplete: () => void;
    private onWrongAnswer: () => void;
    private onTileImpact: (impact: AffectedArea, result: 'correct' | 'wrong') => Promise<void>;

    public questionIndex = 0;
    public correct = 0;

    constructor(canvas: KAPLAYCtx, level: Level, world: WorldManager, questions: QuizQuestion[], onLevelComplete: () => void, onTileImpact: (impact: AffectedArea, result: 'correct' | 'wrong') => Promise<void>, onWrongAnswer: () => void,) {
        this.canvas = canvas;
        this.level = level;
        this.world = world;
        this.questions = questions;
        this.onLevelComplete = onLevelComplete;
        this.onTileImpact = onTileImpact;
        this.onWrongAnswer = onWrongAnswer;
        this.preDamagedAreas();
    }

    public showCurrentQuestion() {
        if (this.questionIndex >= this.questions.length) {
            this.level.complete();
            return;
        }

        const k = this.canvas;
        const currentQuestion = this.questions[this.questionIndex];
        const uiTag = "quiz-ui";

        k.destroyAll(uiTag);

        this.showScore(this.correct);

        const dialogBox = k.add([
            k.rect(800, 170, { radius: 10 }),
            k.pos(k.center().x, k.height() - 100),
            k.anchor("center"),
            k.outline(4),
            k.color(252, 252, 246),
            k.scale(1),
            k.z(100),
            k.fixed(),
            uiTag,
        ]);

        dialogBox.add([
            k.text(currentQuestion.question, {
                size: 10,
                width: 800,
                align: "center",
                lineSpacing: 6
            }),
            k.anchor("center"),
            k.color(0, 0 ,0),
            uiTag,
        ]);
        
        currentQuestion.choices.forEach((choiceText, index) => {
            const yOffset = (index * 72) - 170;

            const btn = k.add([
                k.rect(480, 60, { radius: 8 }),
                k.pos(k.center().x, k.center().y + yOffset),
                k.anchor("center"),
                k.outline(2),
                k.area(),
                k.z(100),
                k.fixed(),
                k.color(8, 135, 43),
                uiTag,
                "choiceBtn"
            ]);

            btn.add([
                k.text(choiceText.text, { size: 10, width: 400, align: "center", lineSpacing: 6 }),
                k.anchor("center"),
                k.color(255, 255 ,255),
                uiTag,
            ]);

            btn.onClick(() => {
                this.answer(index);
            });

            btn.onHoverUpdate(() => {
                btn.scale = k.vec2(1.1);
                k.setCursor("pointer");
            });

            btn.onHoverEnd(() => {
                btn.scale = k.vec2(1);
                k.setCursor("default");
            });
        });
    }

    public async answer(selectedIndex: number) {
        const currentQuestion = this.questions[this.questionIndex];
        const isCorrect = selectedIndex === currentQuestion.correctIndex;
        const impact = this.questions[this.questionIndex].targetTile;

        this.onTileImpact(impact, isCorrect ? "correct" : "wrong");

        if (isCorrect) {
            this.correct++;
            this.clearQuizUI();
        } else {
            this.clearQuizUI();
            this.canvas.wait(3, () => {
                this.onWrongAnswer();
            });
            return;
        }

        this.clearQuizUI();

        this.questionIndex++;

        if (this.questionIndex >= this.questions.length) {
            this.canvas.wait(2.5, () => {
                this.onLevelComplete();
            });
        } else {
            this.canvas.wait(3.2, () => {
                this.showCurrentQuestion();
            });
        }
    }

    private applyImpact(centerX: number, centerY: number, radius: number, tileType: number) {
        for (let x = centerX - radius; x <= centerX + radius; x++) {
            for (let y = centerY - radius; y <= centerY + radius; y++) {
                this.world.setTile(x, y, tileType);
            }
        }
    }

    private clearQuizUI() {
        this.canvas.destroyAll("quiz-ui");
    }

    private showScore (score: number = 0) {
        const k = this.canvas;

        const scoreBg = k.add([
            k.rect(120, 40, { radius: 8 }),
            k.pos(100, 50),
            k.anchor("center"),
            k.color(51, 198, 232),
            k.fixed(),
            k.z(101),
            "quiz-ui"
        ]);

        scoreBg.add([
            k.text(`SCORE: ${score}`, { size: 14 }),
            k.anchor("center"),
            "quiz-ui"
        ]);
    }

    public isFinished() {
        return this.questionIndex >= this.questions.length;
    }

    public getScore() {
        return this.correct;
    }

    private preDamagedAreas() {
        for (const question of this.questions) {
            const impact = question.targetTile;

            this.applyImpact(impact.x, impact.y, impact.radius ?? 1, 1);
        }
    }
}