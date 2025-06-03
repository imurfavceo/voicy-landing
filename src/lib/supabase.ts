import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Supabase environment variables are missing. Please check your .env.local file.');
  throw new Error('Supabase configuration is invalid');
}

// Create the client. If supabaseUrl or supabaseAnonKey are undefined here,
// createClient will likely throw an error or return a non-functional client,
// which is more explicit than using hardcoded dummy values.
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false, // We don't need auth sessions for waitlist
    },
    db: {
      schema: 'public',
    },
  }
); 