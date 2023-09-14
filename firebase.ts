// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBet8h__vkcsfDvcDhAO1qGS-3liRzd45s",
    authDomain: "storyme-82d90.firebaseapp.com",
    projectId: "storyme-82d90",
    storageBucket: "storyme-82d90.appspot.com",
    messagingSenderId: "727116482522",
    appId: "1:727116482522:web:e6a13a4b95dc322ca262e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
