import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.38.0/+esm'

const supabaseUrl = 'https://blpoyqrrpnggvqyvxxrc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscG95cXJycG5nZ3ZxeXZ4eHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzQ3MTYsImV4cCI6MjA3NjU1MDcxNn0.KZK6WrzPpxqw204_TO1GB7n5fwc0KdO5yHEwQ_nSFFA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)