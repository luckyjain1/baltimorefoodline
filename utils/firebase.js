// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnrM9TyjwV1Y2Usz_RVMbzYDDonv8E0as",
  authDomain: "baltimorefoodline-5fbf4.firebaseapp.com",
  projectId: "baltimorefoodline-5fbf4",
  storageBucket: "baltimorefoodline-5fbf4.firebasestorage.app",
  messagingSenderId: "991726729912",
  appId: "1:991726729912:web:6f20cfc35392f58dd7d24d",
  measurementId: "G-G4JLSGC66E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);