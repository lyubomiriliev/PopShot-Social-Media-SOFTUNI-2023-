// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6isjY-wAwvg_FLiNTqQJB7JeiJI84VEA",
  authDomain: "pop-shot-social-media-website.firebaseapp.com",
  projectId: "pop-shot-social-media-website",
  storageBucket: "pop-shot-social-media-website.appspot.com",
  messagingSenderId: "520424191395",
  appId: "1:520424191395:web:581a7c5f0bfb6fb6d49616",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
