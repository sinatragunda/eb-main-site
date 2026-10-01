import type { ReactNode } from "react";



export type PricingTier = {
  id?: string;
  name: string;
  price: number;
  period: string;
  description?: string;
  features: string[];
  popular?: boolean;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: ReactNode;
  cartOption?: boolean;
  rating: number;
  reviews: number;
  tiers: PricingTier[];
  badge?: string;
};

export type CartItem = {
  serviceId: string;
  serviceName: string;
  tierName: string;
  price: number;
  period: string;
};

export type Subscription = {
  id: string;
  service: string;
  tier: string;
  price: number;
  period: string;
  status: "active" | "expiring" | "cancelled";
  renewsOn: string;
  startedOn: string;
};

export type HistoryEntry = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "charge" | "refund";
};
