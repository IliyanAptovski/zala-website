import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const navLogin = document.getElementById("nav-login");
const navSignup = document.getElementById("nav-signup");
const navUserGreeting = document.getElementById("nav-user-greeting");
const navUserName = document.getElementById("nav-user-name");
const navLogoutBtn = document.getElementById("nav-logout-btn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    navLogin.style.display = "none";
    navSignup.style.display = "none";

    navUserGreeting.style.display = "inline";
    navUserName.textContent = user.displayName || user.email || "Friend";

    navLogoutBtn.style.display = "inline-block";
  } else {
    navLogin.style.display = "inline-block";
    navSignup.style.display = "inline-block";

    navUserGreeting.style.display = "none";
    navUserName.textContent = "";
    navLogoutBtn.style.display = "none";
  }
});

if (navLogoutBtn) {
  navLogoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "index.html";
    } catch (error) {
      console.error(error.message);
    }
  });
}
