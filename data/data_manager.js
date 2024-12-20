export const firebaseConfig = {
    apiKey: "AIzaSyBrzWREL5SB_3Af2fTcm1x24ywLo_WjmKw",
    authDomain: "diy-ngl.firebaseapp.com",
    projectId: "diy-ngl",
    storageBucket: "diy-ngl.appspot.com",
    messagingSenderId: "82189557976",
    appId: "1:82189557976:web:b2308e8e2a244961eeb7ad",
    measurementId: "G-JZJ8JJXRLF"
};

const webhookURL = "https://discord.com/api/webhooks/1299650206333141074/ywe-JBRSJb_XbsF3M7aZIWIoYipFX1oi-cse6PKJ2JXIBXzRYhJvGJwZhEpFOYTGrNoi";

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export async function readCollection(collectionName) {
    try {
        const querySnapshot = await db.collection(collectionName).get();
        let datatable = [];
        querySnapshot.forEach(doc => {
            datatable.push({ id: doc.id, data: doc.data() });
        });
        return datatable;
    } catch (error) {
        console.error("Error reading collection:", error);
        return null;
    }
}

export async function addDocument(collectionName, data) {
    try {
        const docRef = await db.collection(collectionName).add(data);
        return true;
    } catch (error) {
        console.error("Error adding document:", error);
        return false;
    }
}

export async function deleteDocument(collectionName, docId) {
    try {
        await db.collection(collectionName).doc(docId).delete();
        return true;
    } catch (error) {
        console.error("Error deleting document:", error);
        return false;
    }
}

export function convert(text) {
    return text.split("").map(function(char) {
        return char.charCodeAt(0).toString(2);
    }).join(" ");
}

export function sendMessage(msg) {
    const request = new XMLHttpRequest();
    request.open("POST", webhookURL);
    request.setRequestHeader("Content-type", "application/json");
    const params = { username: "Micha", avatar_url: "", content: msg };
    request.send(JSON.stringify(params));
}