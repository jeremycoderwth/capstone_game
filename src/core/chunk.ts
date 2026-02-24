import type { TileTypes, Chunk } from "../lib/definitions";
import type { KAPLAYCtx, GameObj } from "kaplay";

export class RenderChunk {
    private canvas: KAPLAYCtx;
    private mapData: number[][];
    private tileTypes: TileTypes;
    private tileSize: number;
    private chunkSize: number;
    private loadedChunks = new Map<string, Chunk>();
    private tileObjects = new Map<string, GameObj>();
    private renderDistance = 2;

    constructor(canvas: KAPLAYCtx, mapData: number[][], tileTypes: TileTypes, tileSize: number, chunkSize = 10) {
        this.canvas = canvas;
        this.mapData = mapData;
        this.tileTypes = tileTypes;
        this.tileSize = tileSize;
        this.chunkSize = chunkSize;
    }

    update(camPos: { x: number, y: number }) {
        const centerChunkX = Math.floor(camPos.x / (this.chunkSize * this.tileSize));
        const centerChunkY = Math.floor(camPos.y / (this.chunkSize * this.tileSize));

        const neededChunks = new Set<string>();

        for (let y = -this.renderDistance; y <= this.renderDistance; y++) {
            for (let x = -this.renderDistance; x <= this.renderDistance; x++) {
                const chunkX = centerChunkX + x;
                const chunkY = centerChunkY + y;

                const key = this.getKey(chunkX, chunkY);

                neededChunks.add(key);

                if (!this.loadedChunks.has(key)) {
                    this.loadChunk(chunkX, chunkY);
                }
            }
        }

        for (const [key] of this.loadedChunks) {
            if (!neededChunks.has(key)) {
                this.unloadChunk(key);
            }
        }
    }

    private loadChunk(chunkX: number, chunkY: number) {
        const key = this.getKey(chunkX, chunkY);
        if (this.loadedChunks.has(key)) return;

        const tiles: GameObj[] = [];

        const startRow = chunkY * this.chunkSize;
        const startCol = chunkX * this.chunkSize;

        for (let y = 0; y < this.chunkSize; y++) {
            for (let x = 0; x < this.chunkSize; x++) {
                const tileY = startRow + y;
                const tileX = startCol + x;

                if (
                tileY < 0 ||
                tileY >= this.mapData.length ||
                tileX < 0 ||
                tileX >= this.mapData[tileY].length
                )
                continue;

                const tileId = this.mapData[tileY][tileX];
                const config = this.tileTypes[tileId];

                if (!config) continue;

                const { name, frame } = config.sprite;

                const worldX = tileX * this.tileSize;
                const worldY = tileY * this.tileSize;

                const scale = this.getDynamicScale(config.frameWidth, config.frameHeight);

                const tile = this.canvas.add([
                    this.canvas.sprite(name, { frame }),
                    this.canvas.pos(worldX, worldY),
                    this.canvas.anchor("topleft"),
                    this.canvas.scale(scale),
                    this.canvas.z(1),
                    "tile",
                ]);

                tiles.push(tile);
                this.tileObjects.set(`${tileX}-${tileY}`, tile);
            }
        }

        this.loadedChunks.set(key, {
            key, tiles,
        });
    }

    private getDynamicScale(frameWidth: number, frameHeight: number) {
        const targetSize = 69;

        if (frameWidth === targetSize && frameHeight === targetSize) {
            return this.canvas.vec2(1);
        }

        const scaleX = targetSize / frameWidth;
        const scaleY = targetSize / frameHeight;

        return this.canvas.vec2(scaleX, scaleY);
    }

    private unloadChunk(key: string) {
        const chunk = this.loadedChunks.get(key);
        if (!chunk) return;

        for (const tile of chunk.tiles) {
            tile.destroy();
        }

        this.loadedChunks.delete(key);
    }

    private getKey(x: number, y: number) {
        return `${x}-${y}`;
    }

    setTile(tileX: number, tileY: number, newTileId: number) {
        this.mapData[tileY][tileX] = newTileId;

        const tileKey = `${tileX}-${tileY}`;
        const oldTile = this.tileObjects.get(tileKey);
        if (oldTile) {
            oldTile.destroy();
        }

        const worldX = tileX * this.tileSize;
        const worldY = tileY * this.tileSize;
        const config = this.tileTypes[newTileId];
        if (!config) return;

        const scale = this.getDynamicScale(config.frameWidth, config.frameHeight);

        const newTile = this.canvas.add([
            this.canvas.sprite(config.sprite.name, { frame: config.sprite.frame }),
            this.canvas.pos(worldX, worldY),
            this.canvas.scale(scale),
            this.canvas.anchor("topleft"),
            "tile",
        ]);

        this.tileObjects.set(tileKey, newTile);
    }
}