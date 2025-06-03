import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let clientUrl = 'https://dummy.supabase.co';
let clientKey = 'dummy-key-for-build-time';

if (supabaseUrl && supabaseAnonKey) {
  clientUrl = supabaseUrl;
  clientKey = supabaseAnonKey;
} else {
  console.warn('Missing Supabase environment variables. Using dummy values for build.');
}

export const supabase = createClient<Database>(clientUrl, clientKey); 