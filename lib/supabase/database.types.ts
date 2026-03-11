export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "admin";
          creem_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          creem_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin";
          creem_customer_id?: string | null;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          creem_subscription_id: string;
          creem_customer_id: string | null;
          creem_product_id: string;
          plan_key: string;
          price_interval: string | null;
          status: string;
          cancel_at_period_end: boolean;
          current_period_start: string | null;
          current_period_end: string | null;
          trial_start: string | null;
          trial_end: string | null;
          canceled_at: string | null;
          last_transaction_id: string | null;
          last_event_id: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          creem_subscription_id: string;
          creem_customer_id?: string | null;
          creem_product_id: string;
          plan_key: string;
          price_interval?: string | null;
          status: string;
          cancel_at_period_end?: boolean;
          current_period_start?: string | null;
          current_period_end?: string | null;
          trial_start?: string | null;
          trial_end?: string | null;
          canceled_at?: string | null;
          last_transaction_id?: string | null;
          last_event_id?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          creem_customer_id?: string | null;
          creem_product_id?: string;
          plan_key?: string;
          price_interval?: string | null;
          status?: string;
          cancel_at_period_end?: boolean;
          current_period_start?: string | null;
          current_period_end?: string | null;
          trial_start?: string | null;
          trial_end?: string | null;
          canceled_at?: string | null;
          last_transaction_id?: string | null;
          last_event_id?: string | null;
          metadata?: Json;
          updated_at?: string;
        };
      };
      credit_balances: {
        Row: {
          user_id: string;
          balance: number;
          lifetime_earned: number;
          lifetime_spent: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          balance?: number;
          lifetime_earned?: number;
          lifetime_spent?: number;
          updated_at?: string;
        };
        Update: {
          balance?: number;
          lifetime_earned?: number;
          lifetime_spent?: number;
          updated_at?: string;
        };
      };
      credit_ledger: {
        Row: {
          id: string;
          user_id: string;
          kind: string;
          amount: number;
          balance_after: number;
          source_key: string;
          source_type: string | null;
          source_id: string | null;
          note: string | null;
          metadata: Json;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          kind: string;
          amount: number;
          balance_after: number;
          source_key: string;
          source_type?: string | null;
          source_id?: string | null;
          note?: string | null;
          metadata?: Json;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          note?: string | null;
          metadata?: Json;
        };
      };
      webhook_events: {
        Row: {
          id: string;
          webhook_id: string;
          event_type: string;
          status: string;
          payload: Json;
          error_message: string | null;
          received_at: string;
          processed_at: string | null;
        };
        Insert: {
          id?: string;
          webhook_id: string;
          event_type: string;
          status?: string;
          payload: Json;
          error_message?: string | null;
          received_at?: string;
          processed_at?: string | null;
        };
        Update: {
          status?: string;
          payload?: Json;
          error_message?: string | null;
          processed_at?: string | null;
        };
      };
    };
    Functions: {
      grant_credits: {
        Args: {
          p_user_id: string;
          p_amount: number;
          p_kind: string;
          p_source_key: string;
          p_source_type?: string | null;
          p_source_id?: string | null;
          p_note?: string | null;
          p_metadata?: Json;
          p_created_by?: string | null;
        };
        Returns: Database["public"]["Tables"]["credit_ledger"]["Row"][];
      };
      consume_credits: {
        Args: {
          p_user_id: string;
          p_amount: number;
          p_kind: string;
          p_source_key: string;
          p_source_type?: string | null;
          p_source_id?: string | null;
          p_note?: string | null;
          p_metadata?: Json;
          p_created_by?: string | null;
        };
        Returns: Database["public"]["Tables"]["credit_ledger"]["Row"][];
      };
    };
  };
};
