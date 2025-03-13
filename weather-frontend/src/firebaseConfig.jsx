import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZDD0-9TLEJF8QQ4cUYs0YXz0OOqHcTlM",
  authDomain: "weather-tracking-app-1d906.firebaseapp.com",
  projectId: "weather-tracking-app-1d906",
  storageBucket: "weather-tracking-app-1d906.firebasestorage.app",
  messagingSenderId: "749188564402",
  appId: "1:749188564402:web:ed080cedbcafabec43d0ab",
  measurementId: "G-PQHDTFDT79"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);