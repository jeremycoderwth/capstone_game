import { Client, Account, ID, Databases, TablesDB, Teams } from "appwrite";

const ENDPOINT = import.meta.env.VITE_ENDPOINT_URL;
const PROJECTID = import.meta.env.VITE_PROJECT_ID;
export const DATABASEID = import.meta.env.VITE_DATABASE_ID;
export const TBL_GAME_SESSIONS = import.meta.env.VITE_TBL_GAME_SESSIONS_ID;
export const TBL_LEVELS = import.meta.env.VITE_TBL_LEVELS_ID;
export const CAPSTONE_TEAMS = import.meta.env.VITE_TEAM_ID;

const client: Client = new Client();

client.setEndpoint(ENDPOINT).setProject(PROJECTID);

export const account: Account = new Account(client);
export const databases: Databases = new Databases(client);
export const tablesDB: TablesDB = new TablesDB(client);
export const teams: Teams = new Teams(client);
export { ID }; 