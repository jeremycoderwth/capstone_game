import type { LevelResult, GameSession, Categories } from "../lib/definitions";
import { ID } from "appwrite";
import { userState } from "../lib/store";

export const gameSesionTracker = {
    startTime: Date.now(),
    session: [] as GameSession[],

    addSession(result: GameSession) {
        this.session.push(result);
    },

    async buildSession() {
        const playerId = userState.user.id;
        const username = userState.user.name;
        const totalScore = this.session.reduce((a, s) => a + s.totalScore, 0);
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        const completedAt = new Date().toISOString();
        
        return {
            playerId,
            username,
            totalScore,
            timeSpent,
            completedAt
        };
    },

    reset() {
        this.session = [];
        this.startTime = Date.now();
    },
};

export const levelTracker = {
    levels: [] as LevelResult[],

    addLevel(result: LevelResult) {
        this.levels.push(result);
    },

    findMatchedCateg(levels: LevelResult[], search: Categories) {
        return levels.find(level => level.category === search);
    },

    async buildLevelResult(category: string, level: number) {
        const levelId = ID.unique();
        const playerId = userState.user.id;
        const score = this.levels.reduce((a, l) => a + l.score, 0);
        const completedAt = new Date().toISOString();

        return {
            levelId,
            playerId,
            category,
            level,
            score,
            completedAt,
        };
    },

    reset() {
        this.levels = [];
    },
};