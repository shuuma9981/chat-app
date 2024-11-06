// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC5f3mv1baUUW9Lb5SFRYXBN61CVzKiCsY",
    authDomain: "chat-app-daae7.firebaseapp.com",
    projectId: "chat-app-daae7",
    storageBucket: "chat-app-daae7.appspot.com",
    messagingSenderId: "25243163875",
    appId: "1:25243163875:web:bc11b2d1eb8887790679d6",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Firestoreインスタンスの作成

export { auth, db };