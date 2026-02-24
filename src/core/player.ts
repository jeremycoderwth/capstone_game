import type { KAPLAYCtx, GameObj, Vec2 } from "kaplay";

export class Player {
    private gameObject: GameObj;
    private canvas: KAPLAYCtx;
    private character: string;
    private speed: number;
    private bounds?: {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    };
    private halfWidth = 15.5;
    private halfHeight = 15.5; 

    constructor(canvas: KAPLAYCtx, character: string, speed: number = 30, name: string) {
        this.canvas = canvas;
        this.character = character;
        this.speed = speed;

        this.gameObject = this.canvas.add([
            canvas.sprite(this.character),
            canvas.pos(canvas.center().x, 300),
            canvas.anchor("center"),
            canvas.scale(0.31),
            canvas.area({ shape: new canvas.Rect(canvas.vec2(0, 0), 100, 100) }),
            canvas.body(),
            canvas.z(10),
            "player"
        ]);
        this.gameObject.add([
            this.canvas.text(name, { size: 45 }),
            this.canvas.pos(0, -140),
            this.canvas.anchor("center"),
            this.canvas.z(10),
            this.canvas.color(255, 250, 253),
            "player",
            "name"
        ]);
        this.setupControls();
        this.gameObject.onUpdate(() => {
            if (!this.bounds) return;

            const pos = this.gameObject.pos;

            const clampedX = this.canvas.clamp(
                pos.x,
                this.bounds.minX,
                this.bounds.maxX
            );

            const clampedY = this.canvas.clamp(
                pos.y,
                this.bounds.minY,
                this.bounds.maxY
            );

            this.gameObject.pos = this.canvas.vec2(clampedX, clampedY);
        });
    }

    private setupControls() {
        const k = this.canvas;

        k.onKeyDown(["left", "a"], () => {
            this.gameObject.move(-this.speed, 0);
            if (this.gameObject.getCurAnim()?.name !== "move-left") {
                this.gameObject.play("move-left");
            }
        });

        k.onKeyDown(["right", "d"], () => {
            this.gameObject.move(this.speed, 0);
            if (this.gameObject.getCurAnim()?.name !== "move-right") {
                this.gameObject.play("move-right");
            }
        });

        k.onKeyDown(["up", "w"], () => {
            this.gameObject.move(0, -this.speed);
            if (this.gameObject.getCurAnim()?.name !== "move-backward") {
                this.gameObject.play("move-backward");
            }
        });

        k.onKeyDown(["down", "s"], () => {
            this.gameObject.move(0, this.speed);
            if (this.gameObject.getCurAnim()?.name !== "move-forward") {
                this.gameObject.play("move-forward");
            }
        });

        k.onKeyRelease(["left", "a"], () => {
            if (!k.isKeyDown(["left", "a"])) {
                this.gameObject.play("idle-left");
            }
        });

        k.onKeyRelease(["right", "d"], () => {
            if (!k.isKeyDown(["right", "d"])) {
                this.gameObject.play("idle-right");
            }
        });

        k.onKeyRelease(["up", "w"], () => {
            if (!k.isKeyDown(["up", "w"])) {
                this.gameObject.play("idle-backward");
            }
        });

        k.onKeyRelease(["down", "s"], () => {
            if (!k.isKeyDown(["down", "s"])) {
                this.gameObject.play("idle-forward");
            }
        });
    }

    public getPosition() {
        return this.gameObject.pos; 
    }

    public teleport(x: number, y: number) {
        this.gameObject.pos = this.canvas.vec2(x, y);
    }

    public setPosition(pos: Vec2) {
        this.gameObject.pos = pos;
    }

    public setBounds(worldWidthPx: number, worldHeightPx: number) {
        this.bounds = {
            minX: this.halfWidth,
            maxX: worldWidthPx - this.halfWidth,
            minY: this.halfHeight,
            maxY: worldHeightPx - this.halfHeight,
        };
    }
}