// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2WWDDnDWkCHNRh_EDbV0FY-tvlU68EsQ",
  authDomain: "instaclone-67f9b.firebaseapp.com",
  projectId: "instaclone-67f9b",
  storageBucket: "instaclone-67f9b.appspot.com",
  messagingSenderId: "872036219705",
  appId: "1:872036219705:web:39660749df8a71b24d46e8",
  measurementId: "G-W1N8LMB9ZM",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);
export const storage = getStorage(app);
export const fireStore = getFirestore(app);

export const postCollection = collection(fireStore, "posts");

export default app;
