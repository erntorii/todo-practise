import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_APIKEY,
  databaseURL: process.env.REACT_APP_FIREBASE_APIKEY,
  projectId: process.env.REACT_APP_FIREBASE_APIKEY,
  storageBucket: process.env.REACT_APP_FIREBASE_APIKEY,
  messagingSenderId: process.env.REACT_APP_FIREBASE_APIKEY,
  appId: process.env.REACT_APP_FIREBASE_APIKEY,
});

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
