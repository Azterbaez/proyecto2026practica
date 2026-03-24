import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE.SUPABASE_URL;
const supabaseKey = import.meta.VITE.SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);