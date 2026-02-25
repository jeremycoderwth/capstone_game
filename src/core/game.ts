import type { KAPLAYCtx } from "kaplay";
import { levels } from "../lib/data";

export class GameManager {
    currentLevelIndex: number = 0;
    score: number = 0;
    private k: KAPLAYCtx;

    constructor(canvas: KAPLAYCtx) {
        this.k = canvas;
    }

    startLevel(levelIdx: number, score: number) {
        this.currentLevelIndex = levelIdx;
        this.score = score;
        this.k.go("quest", levelIdx, score);
    }

    nextLevel() {
        this.currentLevelIndex++;
        this.k.go("quest", this.currentLevelIndex);
    }

    getCurrentLevel() {
        return this.currentLevelIndex;
    }

    getNextLevelIdx() {
        const next = this.currentLevelIndex + 1;
        if (next >= levels.length) {
            return null;
        }

        return next;
    }

    restartLevel() {
        this.k.go("quest", this.currentLevelIndex);
    }
}

export class ProgressManager {
    static getStorageKey(userId: string) {
       return  `game_progress_${userId}`;
    }

    static getUnlockedLevels(userId: string): number {
        const saved = localStorage.getItem(this.getStorageKey(userId));
        if (!saved) return 0;

        return parseInt(saved);
    }

    static unlockLevel(levelIndex: number, userId: string) {
        const current = this.getUnlockedLevels(userId);

        if (levelIndex > current) {
            localStorage.setItem(this.getStorageKey(userId), levelIndex.toString());
        }
    }

    static reset(userId: string) {
        localStorage.removeItem(this.getStorageKey(userId));
    }
}