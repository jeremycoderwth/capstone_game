import type { Character } from "./definitions";

let currentCharacter: Character | null = null;

export function setPlayer(player: Character) {
    currentCharacter = player;
}

export function getPlayer() {
    return currentCharacter;
}

export const userState = {
    user: {
        id: "",
        name: ""
    },
    isAuthenticated: false,
    selectedCharacter: null as Character | null,
};