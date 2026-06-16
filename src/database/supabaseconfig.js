import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_API_KEY
)?.trim();

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Faltan VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env"
  );
}

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
