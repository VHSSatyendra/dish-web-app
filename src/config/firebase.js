// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmX6Xo37mRmofZT3FVQDNK_O4Nb_ywc58",
  authDomain: "dishes-app-3fbf3.firebaseapp.com",
  projectId: "dishes-app-3fbf3",
  storageBucket: "dishes-app-3fbf3.appspot.com",
  messagingSenderId: "856008604627",
  appId: "1:856008604627:web:0a23ca0a60cac42e63cd26",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
