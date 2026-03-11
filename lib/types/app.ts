/**
 * App-related TypeScript types
 * Defines the structure for App entities and related data types
 */

export interface App {
  id: string;
  name: string;
  description: string | null;
  website_url: string | null;
  company_name: string | null;
  business_type: string | null;
  created_at: string;
  updated_at?: string;
}

export interface CreateAppData {
  name: string;
  website_url?: string | null;
  company_name?: string | null;
  business_type?: string | null;
  description?: string | null;
}

