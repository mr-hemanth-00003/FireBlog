
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "fireblog-vg986",
  "appId": "1:857183317390:web:fb9645ea2683de8e0788df",
  "storageBucket": "fireblog-vg986.firebasestorage.app",
  "apiKey": "AIzaSyCuqq4gZGdvpDy7y93kNnn2_ShFTMRFgYI",
  "authDomain": "fireblog-vg986.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "857183317390"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
