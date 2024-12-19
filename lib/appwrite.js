import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: process.env.ENDPOINT,
    platform: process.env.PLATFORM,
    projectId: process.env.PROJECT_ID,
    databaseId:process.env.DATABASE_ID,
    userCollectionID: process.env.USER_COLLECTION_ID,
    videosCollectionId: process.env.VIDEOS_COLLECTION_ID,
    storgeId:process.env.STORAGE_ID
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionID,
    videosCollectionId,
    storgeId,
} = appwriteConfig;

// Init your React Native SDK
const client = new Client();

if (!appwriteConfig || !appwriteConfig.endpoint || !appwriteConfig.projectId || !appwriteConfig.databaseId) {
    throw new Error("Appwrite configuration is missing or incomplete.");
}
// client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);
client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

// console.log(client)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async(email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw new Error("Account creation failed");
        // console.log(client)
        if(!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionID,
            ID.unique(),
            {
                accountId:newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const signIn = async (email, password) =>{
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        )
        return session;
    } catch (error) {
        console.log(error)
    }
}


export const getCurrentUser = async ()=>{
    try{
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionID,
            [Query.equal("accountId", currentAccount.$id)]
        )
        if(!currentAccount) throw Error;

        return currentUser.documents[0];
    }catch(error){
        console.log(error);
    }
}

export const getAllPosts =async ()=>{
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}


export const getLatestVideos =async ()=>{
    try {
        /**
         * Retrieves the latest 7 video documents from the database.
         *
         * @returns {Promise<Array<Object>>} An array of the latest 7 video documents.
         */
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}


export const searchPost =async (query)=>{
    try {
        
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}


export const getUserPosts =async (userId)=>{
    try {
        
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.search("creator", userId)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}