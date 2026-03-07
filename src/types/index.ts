/**
 * KhataBot Type Definitions
 * Shared TypeScript interfaces for database, AI, bot pipeline
 */

export interface Group {
  id: string;
  wa_group_jid: string;
  name: string;
  category: 'home' | 'personal' | 'company' | 'custom';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  aliases: string[];
  phone?: string | null;
  role?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
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
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface BotSession {
  id: string;
  session_id: string;
  creds: Record<string, unknown>;
  keys: Record<string, unknown>;
  qr_code_png?: Buffer | string | null;
  qr_pending?: boolean;
  last_message_at?: string | null;
  messages_processed?: number;
  uptime_seconds?: number;
  created_at: string;
  updated_at: string;
}

export interface ParsedTransaction {
  transaction: {
    amount: number;
    person_name: string;
    purpose?: string;
    category: string;
    payment_mode?: 'cash' | 'upi' | 'bank_transfer' | 'cheque' | 'other';
    txn_date?: string;
    txn_id?: string;
  };
  confidence: number;
  has_image_evidence: boolean;
  extracted_text?: string;
  validation_notes?: string[];
}

export interface EnrichedExtraction extends ParsedTransaction {
  matched_contact?: Contact;
  matched_group?: Group;
  matched_contact_confidence?: number;
  is_potential_duplicate?: boolean;
  duplicate_candidate_ids?: string[];
}

export type MessageType = 'text' | 'image' | 'document' | 'irrelevant';

export interface ClassifiedMessage {
  original_jid: string;
  message_type: MessageType;
  text_content?: string;
  image_buffer?: Buffer;
  image_mime?: string;
  document_buffer?: Buffer;
  document_filename?: string;
  wa_message_id: string;
  timestamp: number;
  sender_name: string;
}

export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'INTERNAL_ERROR',
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
