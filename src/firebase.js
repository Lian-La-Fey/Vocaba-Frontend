import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXJJPd78dTGOaAqeZErIX-AQCgjVSv2Uc",
  authDomain: "vocaba.firebaseapp.com",
  projectId: "vocaba",
  storageBucket: "vocaba.appspot.com",
  messagingSenderId: "573297111789",
  appId: "1:573297111789:web:b5bb616446dc096a23d2e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)