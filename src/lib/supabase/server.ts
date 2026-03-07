import { createClient as createServiceClient } from '@supabase/supabase-js';
import type { Database } from './database.types.js';

let serverClient: ReturnType<typeof createServiceClient<Database>> | null = null;

/**
 * Creates or returns singleton server client
 * Uses service role key to bypass RLS
 */
export function createServerClient() {
  if (serverClient) {
    return serverClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase server environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  serverClient = createServiceClient<Database>(supabaseUrl, serviceRoleKey);
  return serverClient;
}
