import { Client, Account, ID } from "appwrite";
import config from "../config/config";

const client = new Client()
    .setEndpoint(config.appwriteUrl) // Your API Endpoint
    .setProject(config.appwriteProjectId); // Your project ID

const account = new Account(client);

async function createAccount({email, password, name}) {
    try {
        const userAccount = await account.create(
            ID.unique(), 
            email, 
            password,
            name
        )
        if(userAccount) {
            return login({email, password});
        }
        else {
            throw new Error("Unable to create account");
        }
    } catch (error) {
        throw error;
    }
}

async function login({email, password}) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw error;
    }
}

async function getCurrentUser() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        throw error;
    }
}

async function logout() {
    try {
        const session = await account.deleteSessions();
        return session;
    } catch (error) {
        throw error;
    }
}

export { createAccount, login, getCurrentUser, logout };


