import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJ-0cptQFiTZNKOD3YrHmHIjVN9Rk1jSs",
  authDomain: "clinte-25027.firebaseapp.com",
  projectId: "clinte-25027",
  storageBucket: "clinte-25027.appspot.com",
  messagingSenderId: "164388154350",
  appId: "1:164388154350:web:33d2bc724edfe4e0dc3cff",
  measurementId: "G-XJVRTMJHEV"
};

let app: FirebaseApp;
let db: Firestore;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error", error);
  throw new Error(
    "Failed to initialize Firebase. Please ensure you have enabled Firestore in your Firebase project console and that your configuration is correct."
  );
}

export { db };
