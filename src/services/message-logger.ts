/**
 * Message Logger
 * Writes a row to message_logs for every message the bot processes or skips.
 * Used for live debugging on the Settings page.
 */

import { createServerClient } from '@/lib/supabase/server.js';
import pino from 'pino';

const logger = pino({ level: 'warn' });

export interface MessageLogEntry {
  group_name?: string;
  sender?: string;
  message_type?: string;
  text_preview?: string;
  status: 'saved' | 'not_transaction' | 'duplicate' | 'skipped' | 'error';
  skip_reason?: string;
  amount?: number;
  transaction_id?: string;
}

export async function writeMessageLog(entry: MessageLogEntry): Promise<void> {
  try {
    const db = createServerClient() as any;
    await db.from('message_logs').insert({
      group_name: entry.group_name ?? null,
      sender: entry.sender ?? null,
      message_type: entry.message_type ?? null,
      text_preview: entry.text_preview ? entry.text_preview.slice(0, 200) : null,
      status: entry.status,
      skip_reason: entry.skip_reason ?? null,
      amount: entry.amount ?? null,
      transaction_id: entry.transaction_id ?? null,
    });
  } catch (err) {
    logger.warn({ error: String(err) }, 'Failed to write message log');
  }
}
