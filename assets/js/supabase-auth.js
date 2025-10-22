import { supabase } from './supabase-config.js';

console.log('🔧 SUPABASE AUTH INITIALIZED');

// --- Global user state ---
window.currentUser = null;
window.userProfile = null;

// Track if we're currently processing auth
let isProcessingAuth = false;

// --- Update Navbar UI ---
function updateNavigationUI(isLoggedIn) {
  const elements = {
    navGreeting: document.getElementById('nav-user-greeting'),
    navUserName: document.getElementById('nav-user-name'),
    navLogoutBtn: document.getElementById('nav-logout-btn'),
    navLogin: document.getElementById('nav-login'),
    navSignup: document.getElementById('nav-signup')
  };

  if (isLoggedIn) {
    // Prefer profile name, then user_metadata, then email
    const name = window.userProfile?.display_name
                 || window.currentUser?.user_metadata?.full_name
                 || window.currentUser?.email?.split('@')[0]
                 || 'User';

    if (elements.navGreeting) elements.navGreeting.style.display = 'block';
    if (elements.navUserName) elements.navUserName.textContent = name;
    if (elements.navLogoutBtn) elements.navLogoutBtn.style.display = 'block';
    if (elements.navLogin) elements.navLogin.style.display = 'none';
    if (elements.navSignup) elements.navSignup.style.display = 'none';
  } else {
    if (elements.navGreeting) elements.navGreeting.style.display = 'none';
    if (elements.navLogoutBtn) elements.navLogoutBtn.style.display = 'none';
    if (elements.navLogin) elements.navLogin.style.display = 'inline-block';
    if (elements.navSignup) elements.navSignup.style.display = 'inline-block';
  }
}

// --- Load user profile safely ---
async function loadUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, display_name, photo_url, role, created_at, last_login')
      .eq('id', userId)
      .maybeSingle();

    if (error) console.warn('❗ Warning while fetching profile:', error);

    if (!data) {
      console.log('ℹ️ No profile found. Creating one.');
      return await createUserProfile(userId);
    } else {
      console.log('✅ User profile loaded:', data);
      window.userProfile = data;
      return data;
    }
  } catch (err) {
    console.error('💥 Error loading profile:', err);
    return null;
  }
}

// --- Create user profile ---
async function createUserProfile(userId) {
  try {
    const metadata = window.currentUser?.user_metadata || {};
    const userData = {
      id: userId,
      email: window.currentUser?.email || null,
      display_name: metadata.full_name || metadata.name || (window.currentUser?.email?.split('@')[0]) || 'User',
      photo_url: metadata.avatar_url || metadata.picture || null,
      role: 'user',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .maybeSingle();

    if (error) {
      console.error('❌ Error creating user profile:', error);
      return null;
    }

    console.log('✅ User profile created successfully:', data);
    window.userProfile = data;
    return data;
  } catch (err) {
    console.error('💥 Exception creating user profile:', err);
    return null;
  }
}

// --- Auth State Listener ---
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('🎭 AUTH STATE CHANGE:', event, session);
  const currentPage = window.location.pathname.split("/").pop();

  if (session?.user) {
    window.currentUser = session.user;
    const profile = await loadUserProfile(session.user.id);
    if (profile) window.userProfile = profile;

    if ((currentPage === "login.html" || currentPage === "signup.html") && event === 'SIGNED_IN') {
      setTimeout(() => window.location.href = "index.html", 800);
    }

    updateNavigationUI(true);
  } else {
    window.currentUser = null;
    window.userProfile = null;
    updateNavigationUI(false);
  }
});

// --- DOM Loaded ---
document.addEventListener("DOMContentLoaded", () => {
  console.log('🏠 DOM LOADED - Setting up auth handlers');

  // Initial session check
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      window.currentUser = session.user;
      loadUserProfile(session.user.id).then(profile => {
        if (profile) window.userProfile = profile;
        updateNavigationUI(true);
      });
    } else {
      updateNavigationUI(false);
    }
  });

  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      isProcessingAuth = true;

      const email = loginForm.querySelector('input[type="email"]').value.trim();
      const password = loginForm.querySelector('input[type="password"]').value.trim();

      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        alert('Login successful! Redirecting...');
      } catch (error) {
        console.error('Login error:', error);
        alert(error.message || 'Login failed');
      } finally {
        isProcessingAuth = false;
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      isProcessingAuth = true;

      const email = signupForm.querySelector('input[type="email"]').value.trim();
      const password = signupForm.querySelector('input[type="password"]').value.trim();
      const displayName = signupForm.querySelector('input[type="text"]')?.value.trim() || email.split('@')[0];

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: displayName } }
        });
        if (error) throw error;
        if (data?.user) {
          alert('Registration successful! Please confirm your email if required, then log in.');
          window.location.href = "login.html";
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert(error.message || 'Signup failed');
      } finally {
        isProcessingAuth = false;
      }
    });
  }

  // Google OAuth
  const googleButton = document.getElementById('google-login') || document.getElementById('google-signup');
  if (googleButton) {
    googleButton.addEventListener("click", async () => {
      isProcessingAuth = true;
      try {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) throw error;
      } catch (error) {
        console.error('Google OAuth error:', error);
        alert(error.message || 'OAuth failed');
      } finally {
        isProcessingAuth = false;
      }
    });
  }

  // Logout
  const logoutBtn = document.getElementById('nav-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        window.currentUser = null;
        window.userProfile = null;
        updateNavigationUI(false);
        window.location.href = 'index.html';
      } catch (error) {
        console.error('❌ Logout error:', error);
        alert('Logout failed: ' + (error.message || 'unknown error'));
      }
    });
  }
});

// --- Utility ---
export function isAdmin() { return window.userProfile?.role === 'admin'; }
export function getCurrentUser() { return window.currentUser; }
export function getUserProfile() { return window.userProfile; }
