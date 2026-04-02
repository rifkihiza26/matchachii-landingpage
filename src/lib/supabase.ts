import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mynufxiysswhupfhgcvz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bnVmeGl5c3N3aHVwZmhnY3Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDUzODUsImV4cCI6MjA5MDcyMTM4NX0.iWJW-mO_O6wDtnUqTDdVDG8LK4H0jHHuiYr1o6Vc8KM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
