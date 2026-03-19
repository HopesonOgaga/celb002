// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALhgZXvX8xDvKRcl-MlgT9DxY_JPi-es0",
  authDomain: "celebchat-bfe53.firebaseapp.com",
  projectId: "celebchat-bfe53",
  storageBucket: "celebchat-bfe53.firebasestorage.app",
  messagingSenderId: "98345968636",
  appId: "1:98345968636:web:eada248b6cb1f5f8974879",
  measurementId: "G-22DQRZVGYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;