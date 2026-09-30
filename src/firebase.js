import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD03VIHBKioeDUqMMy3q7C7mRZbx_O-M8Y",
  authDomain: "snack-hack-5dae0.firebaseapp.com",
  databaseURL: "https://snack-hack-5dae0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "snack-hack-5dae0",
  storageBucket: "snack-hack-5dae0.firebasestorage.app",
  messagingSenderId: "126649464442",
  appId: "1:126649464442:web:487f97b6e06dfa8b786dc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firestore = getFirestore(app);

export { app, db, firestore, firebaseConfig };

