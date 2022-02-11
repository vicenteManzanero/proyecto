/*Datos Necesarios para usar Firebase*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzA7bJhfOwXAiwL_2cBWFYOqSxQvhwTbg",
  authDomain: "panaderiavictoria-90484.firebaseapp.com",
  projectId: "panaderiavictoria-90484",
  storageBucket: "panaderiavictoria-90484.appspot.com",
  messagingSenderId: "603001051978",
  appId: "1:603001051978:web:aae5852a066b66d6b2bfb3",
  measurementId: "G-K0EY1Y0HLT"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const autentificacion = getAuth(app);