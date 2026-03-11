export type BillingFrequency = "monthly" | "yearly" | "weekly" | "quarterly";

export type PaymentMethodType =
  | "card"
  | "apple_pay"
  | "google_pay"
  | "amazon_pay"
  | "samsung_pay"
  | "paypal"
  | "venmo"
  | "cash_app"
  | "klarna"
  | "afterpay"
  | "bank_transfer"
  | "cash"
  | "other";

export type PaymentMethodBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb";

export type SubscriptionEntryType = "subscription" | "credit_card" | "utility";

export interface SubscriptionClient {
  id: string;
  user_id: string;
  name: string;
  description?: string | null;
  tags?: string[];
  billingEmail?: string | null;
  billingPhone?: string | null;
  logo: string;
  website: string;
  amount: number;
  currency: string;
  frequency: BillingFrequency;
  nextRenewal: Date;
  payingSince?: Date | null;
  category: string;
  color: string;
  sharedWith?: string[];
  entryType: SubscriptionEntryType;
  bankName?: string | null;
  paymentMethodType?: PaymentMethodType | null;
  paymentMethodLast4?: string | null;
  paymentMethodBrand?: PaymentMethodBrand | null;
  creditsIncluded?: number | null;
  creditsResetAt?: Date | null;
  creditsResetReminderEnabled?: boolean;
  renewalRemindersEnabled?: boolean;
  renewalReminderSnoozedUntil?: Date | null;
  canceledAt?: Date | null;
  isActive: boolean;
  createdAt: Date;
}

export interface SubscriptionReceipt {
  id: string;
  user_id: string;
  subscription_id: string;
  custom_name: string;
  file_name: string;
  file_key: string;
  content_type: string;
  file_size: number;
  uploaded_at: string | null;
  created_at: string;
}
