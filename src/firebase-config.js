import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9DpMR49IFSbNyK1QdMQu5_zsLt6qVzcc",
    authDomain: "clients-mangement-system.firebaseapp.com",
    projectId: "clients-mangement-system",
    storageBucket: "clients-mangement-system.appspot.com",
    messagingSenderId: "1090790530708",
    appId: "1:1090790530708:web:6622c321c523eca9309e81",
    measurementId: "G-E8X92E30D9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
