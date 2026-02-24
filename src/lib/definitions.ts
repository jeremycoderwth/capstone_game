import { RenderChunk } from '../core/chunk';
import type { GameObj } from 'kaplay';

export type Categories = 'fire' | 'soil pollution' | 'urbanization' | 'nuclear waste';
export type TileFrame = 0 | 1 | 2 | 3;

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Player = {
    id: string;
    name: string;
    character: string;
};

export type Character = {
    id: "boy" | "girl";
    sprite: string;
};

export type GameLog = {
    sessionID: string;
    playerName: string;
    sprite: "boy" | "girl";
    gameStart: string;
    gameEnd: string;
    isCompleted: boolean;
    date: string;
    createdAt: string | Date;
};

export type LevelLog = {
    id: string;
    playerName: string;
    category: Categories;
    score: number;
}

export interface LevelConfig {
    id: number;
    name: string;
    category: string;
    // mapTheme: TileFrame;
}

export interface LevelData {
    id: number;
    category: string;
    mapData: number[][];
    chunkRenderer?: RenderChunk;
    questions: Question[];
};

export type GameState = {
    selectedCharacter: Character | null;
    setCharacter: (char: Character) => void;
};

export type Score = {
    player_id: string;
    score: number;
};

export interface Question {
    id: string;
    category: Categories;
    text: string;
    options: Choice[];
    correctAnswer: number;
    consequence: object;
};

export type AffectedArea = {
    x: number;
    y: number;
    radius?: number;
};

export interface QuizQuestion {
    id: string;
    category: Categories;
    question: string;
    choices: Choice[];
    correctIndex: number;
    targetTile: AffectedArea;
}

export type Choice = {
    index: number;
    text: string;
};

export type Category = {
    id: Categories;
    name: string;
    description?: string;
    questions: Question[];
    // probably will add image_url if needed
};

export type QualifiedConsequences = {
    allConsequences: string[];
};

export type States = {
    healthy: number[];
    damaged: number[];
    unhealthy: number[];
    destroyed: number[];
};

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationProps {
    message: string;
    type?: NotificationType;
    duration?: number;
    onClose?: () => void;
};

export type TileConfig = {
    sprite: {
        name: string;
        frame: number;
    };
    frameWidth: number;
    frameHeight: number;
    collides: boolean;
}

export type TileTypes = Record<number, TileConfig>;

export interface Chunk {
    key: string;
    tiles: GameObj[];
}

export type LEVELS = {
    id: string;
    worldTheme: TileTypes;
    questions: QuizQuestion[];
    tileSize: number;
    worldWidth: number;
    worldHeight: number;
};

export type ImageButtonProps = {
    src: string;
    alt?: string;
    onClick: () => void;
    classnames?: string;
    text?: string;
};

export type GameSession = {
    playerId: string;
    username: string;
    totalScore: number;
    timeSpent: number;
    completedAt: string;
};

export type LevelResult = {
    levelId: string;
    playerId: string;
    category: string;
    level: number;
    score: number;
    completedAt: string;
};