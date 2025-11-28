export interface IPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  credits_per_month: number;
  features: string[];
  is_active: boolean;
  created_at: string;
}
