
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpmghBKD3PolaBDHB_m5-LOVrVF7SCubk",
  authDomain: "barta-box.firebaseapp.com",
  projectId: "barta-box",
  storageBucket: "barta-box.firebasestorage.app",
  messagingSenderId: "340305583128",
  appId: "1:340305583128:web:dc075cb25726777a82f76d"
};


const fireBaseConfig = initializeApp(firebaseConfig);

export default fireBaseConfig