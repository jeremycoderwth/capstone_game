import type { KAPLAYCtx } from "kaplay";
import type { TileFrame, TileTypes } from "../lib/definitions";
import { RenderChunk } from "./chunk";
import { MapGenerator } from "./map-generator";

export class WorldManager {
    private canvas: KAPLAYCtx;
    public chunkManager: RenderChunk;
    public mapGenerator: MapGenerator;
    private mapData: TileFrame[][];

    constructor(canvas: KAPLAYCtx, canvasWidth: number, canvasHeight: number, tileSize: number, tileFrames: TileTypes ) {
        this.canvas = canvas;
        this.mapGenerator = new MapGenerator(canvasWidth, canvasHeight, tileSize);
        const mapData = this.mapGenerator.createDefaultMap() || this.mapGenerator.getMap("map");
        this.mapData = mapData;
        this.chunkManager = new RenderChunk(canvas, mapData, tileFrames, tileSize, 10);
    }

    public setTile(x: number, y: number, tileId: number) {
        this.chunkManager.setTile(x, y, tileId);
    }

    public updateChunks(playerPos: { x: number, y: number }) {
        this.chunkManager.update(playerPos);
    }

    public getTile(x: number, y: number): number {
        return this.mapData[y]?.[x] ?? 0;
    }
}