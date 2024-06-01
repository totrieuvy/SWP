// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxGB5N4sLZFQ7bJZuQg91fHDpBEXDD4k4",
  authDomain: "jewelry-1a001.firebaseapp.com",
  projectId: "jewelry-1a001",
  storageBucket: "jewelry-1a001.appspot.com",
  messagingSenderId: "702744823551",
  appId: "1:702744823551:web:a27149fd4ff1823c716eca",
  measurementId: "G-X36W2P65XB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export { storage, googleProvider, auth };
