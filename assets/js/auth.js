import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const provider = new GoogleAuthProvider();

// --- Redirect logged-in users from auth pages ---
onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname.split("/").pop();
  if (user && (currentPage === "login.html" || currentPage === "signup.html")) {
    window.location.href = "index.html";
  }
});

// --- DOMContentLoaded: handle forms ---
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const googleLogin = document.getElementById("google-login");
  const googleSignup = document.getElementById("google-signup");

  // Email/password login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value.trim();
      const password = loginForm.querySelector('input[type="password"]').value.trim();

      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "index.html";
      } catch (error) {
        alert(error.message);
      }
    });
  }

  // Email/password signup
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = signupForm.querySelector('input[type="email"]').value.trim();
      const password = signupForm.querySelector('input[type="password"]').value.trim();

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date().toISOString()
        });

        window.location.href = "index.html";
      } catch (error) {
        alert(error.message);
      }
    });
  }

  // Google login/signup (unified)
  const googleButton = googleLogin || googleSignup;
  if (googleButton) {
    googleButton.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName || "Anonymous",
          email: user.email,
          photoURL: user.photoURL || null,
          lastLogin: new Date().toISOString()
        }, { merge: true });

        window.location.href = "index.html";
      } catch (error) {
        alert(error.message);
      }
    });
  }
});