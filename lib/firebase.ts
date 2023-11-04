// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "real-estate-1f38e.firebaseapp.com",
  projectId: "real-estate-1f38e",
  storageBucket: "real-estate-1f38e.appspot.com",
  messagingSenderId: "123156792146",
  appId: "1:123156792146:web:8136d959daf1a45fa0b08b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
