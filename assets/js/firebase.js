// --- Firebase Imports ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyBQ74KUrsBUBihCyVETFlziFicp7KVMHrY",
  authDomain: "zala-studena.firebaseapp.com",
  projectId: "zala-studena",
  storageBucket: "zala-studena.firebasestorage.app",
  messagingSenderId: "740763188429",
  appId: "1:740763188429:web:50e41c5d63c62ebc7e7d84"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
