// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJNOLY_VVETP9CuBF_3pMl8cCnrPotlKo",
  authDomain: "react-revature-6950c.firebaseapp.com",
  projectId: "react-revature-6950c",
  storageBucket: "react-revature-6950c.firebasestorage.app",
  messagingSenderId: "1001303600646",
  appId: "1:1001303600646:web:0d31523a214129d9e4dd87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;