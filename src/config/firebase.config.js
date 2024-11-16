// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJo_mzTeDg-GffUf0W1L7b09UBGdZqHbs",
  authDomain: "cst-project-f9249.firebaseapp.com",
  projectId: "cst-project-f9249",
  storageBucket: "cst-project-f9249.firebasestorage.app",
  messagingSenderId: "446209536692",
  appId: "1:446209536692:web:2ef4deadb666e123bf1de1",
  measurementId: "G-4VN8XQHJWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);