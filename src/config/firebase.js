// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtDX1j_GmEjHZFcOoiURjtsrdluLu0Bko",
  authDomain: "vite-contact-51746.firebaseapp.com",
  projectId: "vite-contact-51746",
  storageBucket: "vite-contact-51746.appspot.com",
  messagingSenderId: "929367568457",
  appId: "1:929367568457:web:2df0ffeef8eff6c5368f98"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);