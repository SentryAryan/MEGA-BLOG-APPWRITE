import { client, storage, ID } from "./conf";
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

async function getFilePreview(fileId) {
    try {
        const filePreview = await storage.getFilePreview(config.appwriteBucketId, fileId);
        return filePreview;
    } catch (error) {
        throw error;
    }
}

export { uploadFile, deleteFile, getFilePreview };
