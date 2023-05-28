



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB34fIPEbhc_KjmSa61Buz2TSpgLsuPBiU",
  authDomain: "chatapp-7058c.firebaseapp.com",
  projectId: "chatapp-7058c",
  storageBucket: "chatapp-7058c.appspot.com",
  messagingSenderId: "421258397956",
  appId: "1:421258397956:web:1c440937c5f5ca074ce851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

export const db = getFirestore(app);