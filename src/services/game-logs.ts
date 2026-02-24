import { tablesDB, ID } from "../auth/appwrite";
import type { GameSession, LevelResult } from "../lib/definitions";
import { DATABASEID, TBL_GAME_SESSIONS, TBL_LEVELS } from "../auth/appwrite";
import { Permission, Role } from "appwrite";
import { userState } from "../lib/store";

export async function saveGameSession(session: GameSession) {
    const player = userState.user;
    const playerId = userState.user.id;

    if (!player) return;

    await tablesDB.createRow({
        databaseId: DATABASEID,
        tableId: TBL_GAME_SESSIONS,
        rowId: ID.unique(),
        data: session,
        permissions: [
            Permission.read(Role.user(playerId)),
            Permission.write(Role.user(playerId)),
        ],
    });
}

export async function saveLevelResult(level: LevelResult) {
    const player = userState.user;
    const playerId = userState.user.id;

    if (!player || !playerId) return;

    await tablesDB.createRow({
        databaseId: DATABASEID,
        tableId: TBL_LEVELS,
        rowId: ID.unique(),
        data: level,
        permissions: [
            Permission.read(Role.user(playerId)),
            Permission.write(Role.user(playerId)),
        ],
    });
}