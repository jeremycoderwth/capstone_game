import type { TileFrame } from "../lib/definitions";
import Toast from "./toast";

export interface Placement {
    row: number;
    col: number;
    value: TileFrame;
};

export class MapGenerator {
    private rows: number;
    private cols: number;
    private defaultFrame: TileFrame;

    constructor(canvasWidth: number, canvasHeight: number, tileSize: number, defaultFrame: TileFrame = 0) {
        this.cols = Math.floor(canvasWidth / tileSize);
        this.rows = Math.floor(canvasHeight / tileSize);
        this.defaultFrame = defaultFrame;
    }

    // create default map pattern from param worldWidth & worldHeight
    public createDefaultMap(): TileFrame[][] {
        const createdArray = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => this.defaultFrame));
        return createdArray;
    }

    // replace part of the map based on the existing map
    public replaceTiles(placements: Placement[], existingMap?: TileFrame[][]): TileFrame[][] {
        const map = existingMap || this.createDefaultMap();

        placements.forEach(({ row, col, value }) => {
            if (map[row] && map[row][col] !== undefined) {
                map[row][col] = value;
            }
        });

        return map;
    }

    // create a map pattern randomly between 0-3 frames
    public createRandomMap(): TileFrame[][] {
        return Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => {
            const random = Math.random();

            if (random < 0.1) return 3;
            if (random < 0.2) return 2;
            if (random < 0.4) return 1;
            return 0;
        }));
    }

    // get the dimension of the map pattern
    public getDimensions() {
        return {
            rows: this.rows,
            cols: this.cols,
        };
    }

    // save map in the localStorage and used for replacing specified tiles in the future
    public saveMap(key: string, map: TileFrame[][]) {
        try {
            const json = JSON.stringify(map);
            localStorage.setItem(key, json);
        } catch (error) {
            Toast.error(`Error saving map: ${error}`);
        }
    }

    // get the saved generated map pattern from the localStorage
    public getMap(key: string): TileFrame[][] {
        try {
            const json = localStorage.getItem(key);
            if (!json) return [];
            return JSON.parse(json) as TileFrame[][];
        } catch (error) {
            Toast.error(`Error retrieving map: ${error}`);
            return [];
        }
    }

    // delete the saved map in the localStorage
    public deleteMap(key: string) {
        try {
            localStorage.removeItem(key);
            Toast.success(`Existing map deleted successfully`);
        } catch (error) {
            Toast.error(`Error deleting saved map: ${error}`);
        }
    }
}