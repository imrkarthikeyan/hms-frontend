import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHO-zerl_70mZce3y5S5T9-aOLCTcUZBQ",
  authDomain: "hostel-management-sysem.firebaseapp.com",
  projectId: "hostel-management-sysem",
  storageBucket: "hostel-management-sysem.appspot.com",
  messagingSenderId: "14742908058",
  appId: "1:14742908058:web:a45a9ac0c9acc74ef6c323",
  measurementId: "G-MVE382RJ34"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };