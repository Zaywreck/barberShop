// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// My configs for firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9OmN-Pnqa9vfs1gBBVi4RarwkKgIFAgo",
  authDomain: "barbershop-1ff79.firebaseapp.com",
  projectId: "barbershop-1ff79",
  storageBucket: "barbershop-1ff79.appspot.com",
  messagingSenderId: "1078747300216",
  appId: "1:1078747300216:web:8dc9f4a5c5532b72a9488d",
  measurementId: "G-MF0D4VF6BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const analytics = getAnalytics(app);

export default firebaseConfig;