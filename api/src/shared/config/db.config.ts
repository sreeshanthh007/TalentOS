import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import { config } from './env.config';


export const supabaseClient = createClient<any>(
  config.SUPABASE_URL,
  config.SUPABASE_SERVICE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
