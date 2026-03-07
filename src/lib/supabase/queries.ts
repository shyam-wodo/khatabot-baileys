/**
 * Bot-specific Supabase queries
 * Only includes queries needed by the bot worker
 */

import { createServerClient } from './server.js';
import type { Group } from '@/types/index.js';

/**
 * Upsert a WhatsApp group discovered by the bot
 * New groups default to is_active: false (user must enable monitoring)
 */
export async function upsertGroupServer(data: {
  wa_group_jid: string;
  name: string;
  category?: string;
  is_active?: boolean;
}): Promise<Group> {
  const supabase = createServerClient();
  const { data: upserted, error } = await supabase
    .from('groups')
    .upsert(
      { category: 'custom', is_active: false, ...data } as any,
      { onConflict: 'wa_group_jid' }
    )
    .select()
    .single();
  if (error) throw new Error(`Failed to upsert group (server): ${error.message}`);
  return upserted as Group;
}
