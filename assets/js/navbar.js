import { supabase } from "./supabase-config.js";

const navLogin = document.getElementById("nav-login");
const navSignup = document.getElementById("nav-signup");
const navUserGreeting = document.getElementById("nav-user-greeting");
const navUserName = document.getElementById("nav-user-name");
const navLogoutBtn = document.getElementById("nav-logout-btn");

async function checkUser() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (user) {
  // Logged in
  navLogin.style.display = "none";
  navSignup.style.display = "none";

  navUserGreeting.style.display = "inline";

  // Use profile display_name if available, otherwise fallback to email or generic "Friend"
  const displayName =
    window.userProfile?.display_name || // from Supabase users table
    user.user_metadata?.full_name ||   // from OAuth metadata
    user.email || 
    "Friend";

  navUserName.textContent = displayName;

  navLogoutBtn.style.display = "inline-block";
} else {
  // Logged out
  navLogin.style.display = "inline-block";
  navSignup.style.display = "inline-block";

  navUserGreeting.style.display = "none";
  navUserName.textContent = "";
  navLogoutBtn.style.display = "none";
}
}

// --- Handle logout ---
if (navLogoutBtn) {
  navLogoutBtn.addEventListener("click", async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("✅ Logged out successfully");
      window.location.href = "index.html";
    } catch (err) {
      console.error("❌ Logout failed:", err.message);
      alert("Logout failed: " + err.message);
    }
  });
}

// --- Listen for auth state changes (live updates) ---
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
    checkUser();
  }
});

// --- Initial check when the page loads ---
document.addEventListener("DOMContentLoaded", checkUser);
