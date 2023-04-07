// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// import {getFirestore} from 'firebase/firestore'

import { getStorage } from 'firebase/storage';

// import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqBcbfPTMjcNAr6GpW7QpM3YMlamG_u5s",
  authDomain: "reacttravel-d295a.firebaseapp.com",
  projectId: "reacttravel-d295a",
  storageBucket: "reacttravel-d295a.appspot.com",
  messagingSenderId: "407645665387",
  appId: "1:407645665387:web:243a876f138dfa61ec192e",
  measurementId: "G-HM2RMCNZSY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage();
// export const db = getFirestore();
// export const auth = getAuth();