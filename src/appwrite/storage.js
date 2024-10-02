import { Client, Storage, ID } from "appwrite"  ;
import config from "../config/config";

const client = new Client()
    .setEndpoint(config.appwriteUrl) // Your API Endpoint
    .setProject(config.appwriteProjectId); // Your project ID

const storage = new Storage(client);

async function uploadFile(file) {
    try {
        const uploadedFile = await storage.createFile(config.appwriteBucketId, ID.unique(), file);
        return uploadedFile;
    } catch (error) {
        throw error;
    }
}

async function deleteFile(fileId) {
    try {
        await storage.deleteFile(config.appwriteBucketId, fileId);
        return true;
    } catch (error) {
        throw error;
    }
}

function getFilePreview(fileId) {
    const filePreview = storage.getFilePreview(config.appwriteBucketId, fileId);
    return filePreview;
}

export { uploadFile, deleteFile, getFilePreview };
