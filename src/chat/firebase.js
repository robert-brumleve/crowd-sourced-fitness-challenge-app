// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
 //remove getAuth when separate signin function is working
import { getFirestore } from "firebase/firestore";
//import { addDoc, collection, onSnapshot, doc, getDocs, query, where} from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTsUYcDMIJ7k3qwU98ix9AUuAVmshAFN0",
  authDomain: "chatapp-df935.firebaseapp.com",
  projectId: "chatapp-df935",
  storageBucket: "chatapp-df935.appspot.com",
  messagingSenderId: "279664956771",
  appId: "1:279664956771:web:32e6c5c5d1e8892f96af56",
  measurementId: "G-3Y5MHTFP83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize User auth
export const auth = getAuth(app);
// Initialize Cloud Firestore to send msg and receive real-time update
export const db = getFirestore(app);