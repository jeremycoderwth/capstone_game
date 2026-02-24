import type { Categories, LevelConfig } from "../lib/definitions";

export class Level {
    public id: number;
    public name: string;
    public category: Categories;
    public unlocked: boolean;
    public completed: boolean = false;
    // public mapTheme: TileFrame;
    public score: number = 0;

    constructor(config: LevelConfig, unlocked = false) {
        this.id = config.id;
        this.name = config.name;
        this.category = config.category as Categories;
        this.unlocked = unlocked;
    }

    public complete() {
        this.completed = true;
    }

    public unlock() {
        this.unlocked = true;
    }

    public setScore(score: number) {
        this.score = score;
    }
}