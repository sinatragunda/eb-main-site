import type { Subscription, HistoryEntry } from "../types/marketplace";

export const MOCK_ACCOUNT = {
  name: "James Okafor",
  email: "j.okafor@ebbanking.com",
  memberSince: "March 2022",
  plan: "Business",
};

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  { id: "s1", service: "Cloud Storage", tier: "Professional", price: 29.99, period: "/mo", status: "active", renewsOn: "Aug 20, 2026", startedOn: "Jan 20, 2024" },
  { id: "s2", service: "Managed Database", tier: "Professional", price: 60, period: "/mo", status: "active", renewsOn: "Aug 20, 2026", startedOn: "Mar 5, 2024" },
  { id: "s3", service: "SSL Certificate", tier: "Professional", price: 49.99, period: "/yr", status: "expiring", renewsOn: "Aug 1, 2026", startedOn: "Aug 1, 2025" },
  { id: "s4", service: "Monitoring & Alerts", tier: "Starter", price: 0, period: "/mo", status: "active", renewsOn: "Aug 20, 2026", startedOn: "Jun 10, 2025" },
  { id: "s5", service: "Email Marketing", tier: "Starter", price: 0, period: "/mo", status: "cancelled", renewsOn: "—", startedOn: "Nov 3, 2023" },
];

export const MOCK_HISTORY: HistoryEntry[] = [
  { id: "h1", date: "Jul 20, 2026", description: "Cloud Storage — Professional", amount: 29.99, type: "charge" },
  { id: "h2", date: "Jul 20, 2026", description: "Managed Database — Professional", amount: 60.00, type: "charge" },
  { id: "h3", date: "Jun 20, 2026", description: "Cloud Storage — Professional", amount: 29.99, type: "charge" },
  { id: "h4", date: "Jun 20, 2026", description: "Managed Database — Professional", amount: 60.00, type: "charge" },
  { id: "h5", date: "Jun 1, 2026", description: "Email Marketing — Refund", amount: 19.99, type: "refund" },
  { id: "h6", date: "May 20, 2026", description: "Cloud Storage — Professional", amount: 29.99, type: "charge" },
  { id: "h7", date: "Aug 1, 2025", description: "SSL Certificate — Professional (annual)", amount: 49.99, type: "charge" },
];
