import { supabase } from './supabase-config.js';

console.log('🔧 Supabase Auth Initialized');

// --- Global state ---
window.currentUser = null;
window.userProfile = null;
let isProcessingAuth = false;

// --- Debug function ---
function debugLog(message, data = null) {
  console.log(`🔍 [Auth] ${message}`, data || '');
}

// --- Update Navbar UI ---
function updateNavigationUI(isLoggedIn) {
  debugLog('Updating navigation UI', { isLoggedIn });
  
  const nav = {
    greeting: document.getElementById('nav-user-greeting'),
    userName: document.getElementById('nav-user-name'),
    logoutBtn: document.getElementById('nav-logout-btn'),
    login: document.getElementById('nav-login'),
    signup: document.getElementById('nav-signup')
  };

  debugLog('Nav elements found', {
    greeting: !!nav.greeting,
    logoutBtn: !!nav.logoutBtn,
    login: !!nav.login,
    signup: !!nav.signup
  });

  if (isLoggedIn && window.currentUser) {
    const name = window.userProfile?.display_name
                 || window.currentUser?.user_metadata?.full_name
                 || window.currentUser?.email?.split('@')[0]
                 || 'User';

    debugLog('User logged in, name:', name);

    if (nav.greeting) {
      nav.greeting.style.display = 'block';
    }
    if (nav.userName) {
      nav.userName.textContent = name;
    }
    if (nav.logoutBtn) {
      nav.logoutBtn.style.display = 'block';
    }
    if (nav.login) {
      nav.login.style.display = 'none';
    }
    if (nav.signup) {
      nav.signup.style.display = 'none';
    }
  } else {
    debugLog('User not logged in, showing auth links');
    if (nav.greeting) nav.greeting.style.display = 'none';
    if (nav.logoutBtn) nav.logoutBtn.style.display = 'none';
    if (nav.login) nav.login.style.display = 'inline-block';
    if (nav.signup) nav.signup.style.display = 'inline-block';
  }
}

// --- Load or create user profile ---
async function loadUserProfile(userId) {
  try {
    debugLog('Loading profile for user:', userId);
    
    // First, check if profiles table exists and has data
    const { data: tableInfo, error: tableError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (tableError) {
      debugLog('Profiles table error - table might not exist:', tableError);
      return await createUserProfile(userId);
    }

    debugLog('Profiles table exists, querying user profile');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      debugLog('Error querying profile:', error);
      throw error;
    }

    debugLog('Profile query result:', data);

    if (!data) {
      debugLog('No profile found, creating new one');
      return await createUserProfile(userId);
    }

    // Update last login time
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);

    if (updateError) {
      debugLog('Error updating last login:', updateError);
    }

    window.userProfile = data;
    debugLog('Profile loaded successfully:', data);
    return data;
  } catch (err) {
    console.error('❌ Error loading profile:', err);
    return null;
  }
}

async function createUserProfile(userId) {
  debugLog('Creating new profile for user:', userId);
  
  const metadata = window.currentUser?.user_metadata || {};
  const newProfile = {
    id: userId,
    email: window.currentUser?.email || null,
    display_name: metadata.full_name || 
                 metadata.name || 
                 (window.currentUser?.email?.split('@')[0]) || 
                 'User',
    role: 'user',
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString()
  };

  debugLog('New profile data:', newProfile);

  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([newProfile])
      .select()
      .maybeSingle();

    if (error) {
      debugLog('Error inserting profile:', error);
      
      // If there's a constraint violation, try to fetch existing profile
      if (error.code === '23505') { // Unique violation
        debugLog('Profile already exists, fetching...');
        return await loadUserProfile(userId);
      }
      throw error;
    }

    window.userProfile = data;
    debugLog('Profile created successfully:', data);
    return data;
  } catch (err) {
    console.error('❌ Error creating profile:', err);
    return null;
  }
}

// --- Auth State Listener ---
supabase.auth.onAuthStateChange(async (event, session) => {
  debugLog('Auth state changed', { event, session: !!session });
  console.log('Full session:', session);

  if (session?.user) {
    debugLog('User session found:', session.user.id);
    window.currentUser = session.user;
    
    // Load profile with retry logic
    let profile = await loadUserProfile(session.user.id);
    let retryCount = 0;
    
    while (!profile && retryCount < 3) {
      debugLog(`Retrying profile load (attempt ${retryCount + 1})`);
      await new Promise(resolve => setTimeout(resolve, 500));
      profile = await loadUserProfile(session.user.id);
      retryCount++;
    }
    
    updateNavigationUI(true);

    // Redirect if on auth pages
    const currentPage = window.location.pathname;
    debugLog('Current page:', currentPage);
    
    if ((currentPage.includes('login.html') || currentPage.includes('signup.html')) 
        && event === 'SIGNED_IN') {
      debugLog('Redirecting from auth page to index');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 800);
    }
  } else {
    debugLog('No user session, clearing state');
    window.currentUser = null;
    window.userProfile = null;
    updateNavigationUI(false);
  }
});

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  debugLog('DOM loaded, initializing auth');

  // Initial session check
  supabase.auth.getSession().then(({ data: { session } }) => {
    debugLog('Initial session check:', session ? 'Session found' : 'No session');
    
    if (session?.user) {
      window.currentUser = session.user;
      debugLog('Session user:', session.user);
      
      loadUserProfile(session.user.id).then(profile => {
        debugLog('Profile loaded in init:', profile);
        updateNavigationUI(true);
      }).catch(err => {
        console.error('❌ Error loading profile on init:', err);
        updateNavigationUI(false);
      });
    } else {
      updateNavigationUI(false);
    }
  }).catch(err => {
    console.error('❌ Error getting session:', err);
    updateNavigationUI(false);
  });

  // Enhanced login form handler
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    debugLog('Login form found');
    
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (isProcessingAuth) {
        debugLog('Auth already processing');
        return;
      }
      
      isProcessingAuth = true;
      debugLog('Processing login...');

      const emailInput = loginForm.querySelector('input[type="email"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');
      
      if (!emailInput || !passwordInput) {
        alert('Login form fields not found');
        isProcessingAuth = false;
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      debugLog('Login attempt:', { email, passwordLength: password.length });

      // Basic validation
      if (!email || !password) {
        alert('Please fill in all fields');
        isProcessingAuth = false;
        return;
      }

      if (!email.includes('@')) {
        alert('Please enter a valid email address');
        isProcessingAuth = false;
        return;
      }

      try {
        const { data, error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        
        if (error) {
          debugLog('Login error:', error);
          
          // User-friendly error messages
          if (error.message.includes('Invalid login credentials')) {
            alert('Incorrect email or password. Please try again.');
          } else if (error.message.includes('Email not confirmed')) {
            alert('Please confirm your email address before logging in.');
          } else {
            alert(`Login failed: ${error.message}`);
          }
          throw error;
        }
        
        debugLog('Login successful:', data);
        alert('Login successful! Redirecting...');
        
        // Clear form
        loginForm.reset();
        
      } catch (err) {
        console.error('❌ Login error:', err);
      } finally {
        isProcessingAuth = false;
        debugLog('Login processing complete');
      }
    });
  }

  // Enhanced signup form handler
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    debugLog('Signup form found');
    
    signupForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (isProcessingAuth) {
        debugLog('Auth already processing');
        return;
      }
      
      isProcessingAuth = true;
      debugLog('Processing signup...');

      const emailInput = signupForm.querySelector('input[type="email"]');
      const passwordInput = signupForm.querySelector('input[type="password"]');
      const nameInput = signupForm.querySelector('input[type="text"]');
      
      if (!emailInput || !passwordInput) {
        alert('Signup form fields not found');
        isProcessingAuth = false;
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const displayName = nameInput ? nameInput.value.trim() : email.split('@')[0];

      debugLog('Signup attempt:', { 
        email, 
        passwordLength: password.length,
        displayName 
      });

      // Enhanced validation
      if (!email || !password) {
        alert('Please fill in all required fields');
        isProcessingAuth = false;
        return;
      }

      if (!email.includes('@')) {
        alert('Please enter a valid email address');
        isProcessingAuth = false;
        return;
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        isProcessingAuth = false;
        return;
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { 
            data: { 
              full_name: displayName 
            },
            emailRedirectTo: `${window.location.origin}/index.html`
          }
        });
        
        if (error) {
          debugLog('Signup error:', error);
          
          if (error.message.includes('User already registered')) {
            alert('This email is already registered. Please login instead.');
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 1000);
          } else {
            alert(`Signup failed: ${error.message}`);
          }
          throw error;
        }
        
        debugLog('Signup successful:', data);
        
        if (data.user?.identities?.length === 0) {
          alert('This email is already registered. Please check your email or try logging in.');
        } else {
          alert('Signup successful! Please check your email to confirm your account, then login.');
        }
        
        // Clear form and redirect
        signupForm.reset();
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
        
      } catch (err) {
        console.error('❌ Signup error:', err);
      } finally {
        isProcessingAuth = false;
        debugLog('Signup processing complete');
      }
    });
  }

  // OAuth login (Google)
  const googleButtons = document.querySelectorAll('#google-login, #google-signup');
  googleButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      if (isProcessingAuth) return;
      
      isProcessingAuth = true;
      debugLog('Starting Google OAuth');
      
      try {
        const { error } = await supabase.auth.signInWithOAuth({ 
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/index.html`
          }
        });
        
        if (error) throw error;
      } catch (err) {
        console.error('❌ Google OAuth error:', err);
        alert(err.message || 'Google login failed');
      } finally {
        isProcessingAuth = false;
      }
    });
  });

  // Logout handler
  const logoutBtn = document.getElementById('nav-logout-btn');
  if (logoutBtn) {
    debugLog('Logout button found');
    
    logoutBtn.addEventListener('click', async e => {
      e.preventDefault();
      debugLog('Logout clicked');
      
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        window.currentUser = null;
        window.userProfile = null;
        updateNavigationUI(false);
        
        debugLog('Logout successful, redirecting...');
        window.location.href = 'index.html';
        
      } catch (err) {
        console.error('❌ Logout error:', err);
        alert('Logout failed: ' + (err.message || 'unknown error'));
      }
    });
  }
});