// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRf0crOX8rYdEBFNpLYAY-flMzgKMRp4s",
  authDomain: "real-estate-3e0dc.firebaseapp.com",
  projectId: "real-estate-3e0dc",
  storageBucket: "real-estate-3e0dc.appspot.com",
  messagingSenderId: "496454898308",
  appId: "1:496454898308:web:ab7d7eb696ad907d22e8d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
