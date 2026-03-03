import k from "../context";

export function loadAssets() {
    k.loadSprite('forest', '/backgrounds/pixel-forest.png');
    k.loadSprite('jungle', '/backgrounds/jungle.jpg');

    k.loadSprite("boy", '/sprites/boy.png', {
        sliceX: 4,
        sliceY: 4,
        anims: {
            "idle-forward": { from: 0, to: 0 },
            "idle-backward": { from: 4, to:4 },
            "idle-left": { from: 8, to: 8 },
            "idle-right": { from: 12, to: 12 },
            "move-forward": {
                from: 0,
                to: 3,
                loop: true
            },
            "move-backward": {
                from: 4,
                to: 7,
                loop: true
            },
            "move-left": {
                from: 8,
                to: 11,
                loop: true
            },
            "move-right": {
                from: 12,
                to: 15,
                loop: true
            }
        }
    });

    k.loadSprite("girl", '/sprites/girl.png', {
        sliceX: 4,
        sliceY: 4,
        anims: {
            "idle-forward": { from: 0, to: 0 },
            "idle-backward": { from: 4, to:4 },
            "idle-left": { from: 8, to: 8 },
            "idle-right": { from: 12, to: 12 },
            "move-forward": {
                from: 0,
                to: 3,
                loop: true
            },
            "move-backward": {
                from: 4,
                to: 7,
                loop: true
            },
            "move-left": {
                from: 8,
                to: 11,
                loop: true
            },
            "move-right": {
                from: 12,
                to: 15,
                loop: true
            }
        }
    });

    k.loadSprite("arrowLeft", '/gui/arrow_left.png');
    k.loadSprite("arrowRight", '/gui/arrow_right.png');

    k.loadFont("PressStart2P", "/fonts/PressStart2P.ttf");
    
    k.loadFont("Pixel", '/fonts/PublicPixel.ttf')

    k.loadSprite("arrowLeftBold", '/gui/arrow_left_bold.png');
    k.loadSprite("arrowRightBold", '/gui/arrow_rigth_bold.png');

    k.loadSprite("confirmBtn", '/gui/gooey_text.png');

    k.loadSprite("fire", '/tiles/fire_tile.png', {
        sliceX: 2,
        sliceY: 2
    });
    k.loadSprite("soil", '/tiles/soil_tile.png', {
        sliceX: 2,
        sliceY: 2
    });
    k.loadSprite("nuclearWaste", '/tiles/nuclear_waste_tile.jpg', {
        sliceX: 2,
        sliceY: 2
    });
    k.loadSprite("urbanization", '/tiles/urbanization_tile.jpg', {
        sliceX: 2,
        sliceY: 2
    });

    k.loadSprite("play", '/gui/play_rect.png');

    k.loadSprite("restart", '/gui/restart.png');

    k.loadSprite("tree_green_1", '/trees/TREE 1_GREEN.png');
    k.loadSprite("tree_yellowish_green", '/trees/TREE 2_YELLOWISH GREEN.png');
    k.loadSprite("tree_sandy_green", '/trees/TREE 3_SANDY GREEN.png');
    k.loadSprite("tree_green_2", '/trees/TREE 4_TEAL.png');
    k.loadSprite("tree_teal", '/trees/TREE 5_SANDY GREEN.png');
    k.loadSprite("tree_purple", '/trees/TREE 6_GREEN.png');
    k.loadSprite("tree_rose", '/trees/TREE 8_PURPLE.png');
    k.loadSprite("tree_red", './trees/TREE 8_ROSE.png');
}