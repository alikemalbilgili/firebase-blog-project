// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW-qymIRdVvS6-gzDdyTMMMH1Yk7sP9dE",
  authDomain: "blogpostreact.firebaseapp.com",
  projectId: "blogpostreact",
  storageBucket: "blogpostreact.appspot.com",
  messagingSenderId: "637365911205",
  appId: "1:637365911205:web:08a635ea939559bcb4d74c",
  measurementId: "G-67J77EF9N3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =  getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
