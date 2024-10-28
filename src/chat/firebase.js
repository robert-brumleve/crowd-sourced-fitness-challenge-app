// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTsUYcDMIJ7k3qwU98ix9AUuAVmshAFN0",
  authDomain: "chatapp-df935.firebaseapp.com",
  projectId: "chatapp-df935",
  storageBucket: "chatapp-df935.appspot.com",
  messagingSenderId: "279664956771",
  appId: "1:279664956771:web:792a37afd188032f96af56",
  measurementId: "G-4WRGLJ5VKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);