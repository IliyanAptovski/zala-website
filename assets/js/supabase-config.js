import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Log for debugging
console.log('🔧 Initializing Supabase client...');

// Get environment variables (make sure these are set correctly)
const supabaseUrl = window.SUPABASE_URL || 'https://blpoyqrrpnggvqyvxxrc.supabase.co';
const supabaseAnonKey = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscG95cXJycG5nZ3ZxeXZ4eHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzQ3MTYsImV4cCI6MjA3NjU1MDcxNn0.KZK6WrzPpxqw204_TO1GB7n5fwc0KdO5yHEwQ_nSFFA';

console.log('Supabase URL:', supabaseUrl.substring(0, 30) + '...');
console.log('Supabase Key exists:', !!supabaseAnonKey);

// Create the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'supabase.auth.token'
  }
});

// Test connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase connection error:', error);
  } else {
    console.log('✅ Supabase connected successfully');
    console.log('Session exists:', !!data.session);
  }
});

// Make available globally for debugging
window.supabase = supabase;