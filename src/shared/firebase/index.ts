import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIBOqYj9HbLlcDbTqz597eSG9I81GmTG4",
  authDomain: "tokshop-33509.firebaseapp.com",
  projectId: "tokshop-33509",
  storageBucket: "tokshop-33509.appspot.com",
  messagingSenderId: "65319097700",
  appId: "1:65319097700:web:381829cf95f8ac35f69671"
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const  db = getFirestore(app);


