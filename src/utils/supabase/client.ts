import { createBrowserClient } from '@supabase/ssr';

import type { Database } from '@/lib/types/database.types';

// Define a function to create a Supabase client for client-side operations
export const getSupabaseClient = () =>
  createBrowserClient<Database>(
    // Pass Supabase URL and anonymous key from the environment to the client
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
