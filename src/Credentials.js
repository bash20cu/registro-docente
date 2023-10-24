// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPPfP9KxDwjGwIKyye6nFp8QfedbymlZ8",
  authDomain: "registro-docente-9c7f3.firebaseapp.com",
  projectId: "registro-docente-9c7f3",
  storageBucket: "registro-docente-9c7f3.appspot.com",
  messagingSenderId: "173395236053",
  appId: "1:173395236053:web:0fb1cee988369e91e23e5c",
  measurementId: "G-R2EFYY1HH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);