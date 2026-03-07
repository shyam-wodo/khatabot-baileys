/**
 * Supabase Database Types
 * Auto-generated type definitions for all tables
 */

export interface Tables {
  groups: {
    Row: {
      id: string;
      wa_group_jid: string;
      name: string;
      category: 'home' | 'personal' | 'company' | 'custom';
      is_active: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      wa_group_jid: string;
      name: string;
      category: 'home' | 'personal' | 'company' | 'custom';
      is_active?: boolean;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      wa_group_jid?: string;
      name?: string;
      category?: 'home' | 'personal' | 'company' | 'custom';
      is_active?: boolean;
      created_at?: string;
      updated_at?: string;
    };
  };
  contacts: {
    Row: {
      id: string;
      name: string;
      aliases: string[];
      phone: string | null;
      role: string | null;
      notes: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      aliases?: string[];
      phone?: string | null;
      role?: string | null;
      notes?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      name?: string;
      aliases?: string[];
      phone?: string | null;
      role?: string | null;
      notes?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  transactions: {
    Row: {
      id: string;
      group_id: string | null;
      contact_id: string | null;
      amount: number;
      person_name: string;
      purpose: string | null;
      category: string;
      payment_mode: 'cash' | 'upi' | 'bank_transfer' | 'cheque' | 'other' | null;
      txn_id: string | null;
      txn_date: string | null;
      notes: string | null;
      confidence: number | null;
      raw_message: string | null;
      wa_message_id: string | null;
      is_edited: boolean;
      is_deleted: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      group_id?: string | null;
      contact_id?: string | null;
      amount: number;
      person_name: string;
      purpose?: string | null;
      category: string;
      payment_mode?: 'cash' | 'upi' | 'bank_transfer' | 'cheque' | 'other' | null;
      txn_id?: string | null;
      txn_date?: string | null;
      notes?: string | null;
      confidence?: number | null;
      raw_message?: string | null;
      wa_message_id?: string | null;
      is_edited?: boolean;
      is_deleted?: boolean;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      group_id?: string | null;
      contact_id?: string | null;
      amount?: number;
      person_name?: string;
      purpose?: string | null;
      category?: string;
      payment_mode?: 'cash' | 'upi' | 'bank_transfer' | 'cheque' | 'other' | null;
      txn_id?: string | null;
      txn_date?: string | null;
      notes?: string | null;
      confidence?: number | null;
      raw_message?: string | null;
      wa_message_id?: string | null;
      is_edited?: boolean;
      is_deleted?: boolean;
      created_at?: string;
      updated_at?: string;
    };
  };
  bot_sessions: {
    Row: {
      id: string;
      session_id: string;
      creds: Record<string, unknown>;
      keys: Record<string, unknown>;
      qr_code_png: string | null;
      qr_pending: boolean;
      last_message_at: string | null;
      messages_processed: number;
      uptime_seconds: number;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      session_id: string;
      creds: Record<string, unknown>;
      keys: Record<string, unknown>;
      qr_code_png?: string | null;
      qr_pending?: boolean;
      last_message_at?: string | null;
      messages_processed?: number;
      uptime_seconds?: number;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      session_id?: string;
      creds?: Record<string, unknown>;
      keys?: Record<string, unknown>;
      qr_code_png?: string | null;
      qr_pending?: boolean;
      last_message_at?: string | null;
      messages_processed?: number;
      uptime_seconds?: number;
      created_at?: string;
      updated_at?: string;
    };
  };
}

export type Database = {
  public: {
    Tables: Tables;
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
  };
};
