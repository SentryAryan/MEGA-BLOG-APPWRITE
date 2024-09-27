import { client, Databases, Query } from "appwrite";
import config from "../config/config";

const client = new Client()
    .setEndpoint(config.appwriteUrl) // Your API Endpoint
    .setProject(config.appwriteProjectId); // Your project ID

const databases = new Databases(client);

async function createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
        const post = await databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId,
            }
        )
        return post;
    } catch (error) {
        throw error;
    }
}

async function updatePost(slug, { title, content, featuredImage, status }) {
    try {
        const post = await databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
        return post;
    } catch (error) {
        throw error;
    }
}

async function deletePost(slug) {
    if (!slug) {
        throw new Error("Slug is required");
    }
    try {
        await databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        );
        return true;
    } catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }
}

async function getPost(slug) {
    try {
        const post = await databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        );
        return post;
    } catch (error) {
        console.error("Error getting post:", error);
        return null;
    }
}

async function getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
        const posts = await databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        );
        return posts;
    } catch (error) {
        console.error("Error getting all posts:", error);
        return null;
    }
}

export { databases, client, createPost, updatePost, deletePost, getPost, getAllPosts };

