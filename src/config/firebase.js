import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence, ReactNativeAsyncStorage} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqm2X9Hxr3Ass3b9Q05MuwWDToas2Tqhg",
  authDomain: "hemoaid.firebaseapp.com",
  projectId: "hemoaid",
  storageBucket: "hemoaid.appspot.com",
  messagingSenderId: "384943580309",
  appId: "1:384943580309:web:77ec3af6222dbaf4c8a79c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export { auth, storage, db };