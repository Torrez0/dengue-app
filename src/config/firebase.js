
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7Nn1KRNvrO7Qi9Br_2SOf0kk3ERow9fs",
  authDomain: "pi-dengue.firebaseapp.com",
  projectId: "pi-dengue",
  storageBucket: "pi-dengue.appspot.com",
  messagingSenderId: "481530595582",
  appId: "1:481530595582:web:179c084095fae4fc753daf",
  measurementId: "G-Z8ZNNVM09B"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth (app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore(app)

export {auth, db};
