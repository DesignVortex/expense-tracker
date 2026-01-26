import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(`Supabase configuration missing in .env. URL: ${supabaseUrl}, Key: ${supabaseAnonKey ? 'Found' : 'Missing'}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
