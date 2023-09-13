// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1jgwW83d_6Fzxi-eoXtBJEC6VWaQvl2I",
  authDomain: "papercrypto-96e7b.firebaseapp.com",
  projectId: "papercrypto-96e7b",
  storageBucket: "papercrypto-96e7b.appspot.com",
  messagingSenderId: "113721495222",
  appId: "1:113721495222:web:ba73ec7e5f857116486017",
  measurementId: "G-W0MVF23979"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

export const OnAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const signOutOfApp = () => signOut(auth);

