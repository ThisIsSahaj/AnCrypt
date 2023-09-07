import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./config/firebaseConfig.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const mydb = getFirestore();
const firestore = getFirestore(firebaseApp);


// const firestore = firebase.firestore();

export{ auth, db,firestore ,mydb};