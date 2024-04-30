import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmh-i_a3_l7FzJxzpSeb-rkthdK6DW-lQ",
  authDomain: "final-project-6cdde.firebaseapp.com",
  projectId: "final-project-6cdde",
  storageBucket: "final-project-6cdde.appspot.com",
  messagingSenderId: "525964984471",
  appId: "1:525964984471:web:b11c0bf7f108f177da29d2",
  measurementId: "G-4R0ZR3BBXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, storage, db };