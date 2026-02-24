import { account, ID } from "./appwrite";
import { userState } from "../lib/store";

// signup function
export async function signup(email: string, password: string, username: string) {
    // create a new user
    await account.create({ userId: ID.unique(), email: email, password: password, name: username });

    // auto login after signup
    await login(email, password); 
}

// login function
export async function login(email: string, password: string) {
    return await account.createEmailPasswordSession({ email: email, password: password });
}

// logout function
export async function logout() {
    // delete's the session of the current logged user
    await account.deleteSession({ sessionId: 'current' });
}

// get current logged in user
export async function initUser() {
    try {
        const user = await account.get();

        userState.user.id = user.$id;
        userState.user.name = user.name;
        userState.isAuthenticated = true;
    } catch {
        userState.isAuthenticated = false;
    }
}