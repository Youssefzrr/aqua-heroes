import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuration Firebase (remplacez par vos propres clés)
const firebaseConfig = {
    apiKey: "AIzaSyB0JG81hZP7CLmKX3HjARsyM47YLIHyk-E",
    authDomain: "aquaheroes-e3cb6.firebaseapp.com",
    projectId: "aquaheroes-e3cb6",
    storageBucket: "aquaheroes-e3cb6.firebasestorage.app",
    messagingSenderId: "72003654513",
    appId: "1:72003654513:web:2d72f93ce7a428b73d9cd0",
    measurementId: "G-9YH9DJGS8E"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);