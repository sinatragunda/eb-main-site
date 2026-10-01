import { useState } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Clock,
  Settings,
  LogOut,
  Package,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { NAVY, TEAL } from "../../constants/brand";
import { MOCK_ACCOUNT, MOCK_SUBSCRIPTIONS, MOCK_HISTORY } from "../../data/mockAccount";
import {UserDetails} from "@/app/services/http/types.ts";

export function AccountPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

  const [tab, setTab] = useState<"overview" | "subscriptions" | "history">("overview");

  const getUserDetails = () : UserDetails | null => {
      const details = localStorage.getItem("eb_user_details");
      if(details){
          return JSON.parse(details) as UserDetails;
      }
      return null;
  }

  const [userDetails, setUserDetails] = useState<UserDetails | null>(getUserDetails);


  const activeCount = MOCK_SUBSCRIPTIONS.filter((s) => s.status === "active" || s.status === "expiring").length;
  const monthlySpend = MOCK_SUBSCRIPTIONS
    .filter((s) => s.status !== "cancelled" && s.period === "/mo")
    .reduce((sum, s) => sum + s.price, 0);

  const statusConfig = {
    active: { label: "Active", color: "text-green-600 bg-green-50", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    expiring: { label: "Expiring Soon", color: "text-amber-600 bg-amber-50", icon: <AlertCircle className="w-3.5 h-3.5" /> },
    cancelled: { label: "Cancelled", color: "text-muted-foreground bg-muted", icon: <X className="w-3.5 h-3.5" /> },
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-card shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="text-white px-5 py-4" style={{ backgroundColor: NAVY }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">My Account</h2>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: TEAL }}>
              {MOCK_ACCOUNT.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="font-semibold text-white">{userDetails?.name}</p>
              <p className="text-xs text-white/60">{userDetails?.email}</p>
            </div>
            <span className="ml-auto text-[10px] font-bold px-2 py-1 rounded border border-white/30" style={{ backgroundColor: "rgba(0,151,178,0.2)", color: "#7de0f0" }}>
              {MOCK_ACCOUNT.plan}
            </span>
          </div>
        </div>

        <div className="flex border-b border-border bg-card">
          {(["overview", "subscriptions", "history"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-colors ${
                tab === t ? "border-b-2" : "text-muted-foreground hover:text-foreground"
              }`}
              style={tab === t ? { color: TEAL, borderBottomColor: TEAL } : undefined}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {tab === "overview" && (
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Active Services", value: activeCount, icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> },
                  { label: "Monthly Spend", value: `$${monthlySpend.toFixed(2)}`, icon: <CreditCard className="w-4 h-4" style={{ color: TEAL }} /> },
                ].map((stat) => (
                  <div key={stat.label} className="bg-muted/40 rounded-lg p-3 border border-border">
                    <div className="flex items-center justify-between mb-1">{stat.icon}</div>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {MOCK_SUBSCRIPTIONS.some((s) => s.status === "expiring") && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-700">Renewal Required</p>
                    <p className="text-xs text-amber-600 mt-0.5">Your SSL Certificate expires Aug 1, 2026. Renew now to avoid interruption.</p>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quick Actions</p>
                {[
                  { label: "View active subscriptions", action: () => setTab("subscriptions"), icon: <Package className="w-4 h-4" /> },
                  { label: "Billing & payment history", action: () => setTab("history"), icon: <Clock className="w-4 h-4" /> },
                  { label: "Account settings", action: () => {}, icon: <Settings className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors text-sm text-foreground"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-muted-foreground">{item.icon}</span>
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
              <div className="pt-1">
                <p className="text-xs text-muted-foreground">Member since {MOCK_ACCOUNT.memberSince}</p>
              </div>
            </div>
          )}

          {tab === "subscriptions" && (
            <div className="p-5 space-y-3">
              <p className="text-xs text-muted-foreground">{MOCK_SUBSCRIPTIONS.length} total services</p>
              {MOCK_SUBSCRIPTIONS.map((sub) => {
                const cfg = statusConfig[sub.status];
                return (
                  <div key={sub.id} className="border border-border rounded-lg p-3.5 space-y-2 hover:border-border/60 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{sub.service}</p>
                        <p className="text-xs text-muted-foreground">{sub.tier} plan</p>
                      </div>
                      <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {sub.status === "cancelled" ? "Ended" : `Renews ${sub.renewsOn}`}
                      </span>
                      <span className="font-bold text-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {sub.price === 0 ? "Free" : `$${sub.price.toFixed(2)}${sub.period}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "history" && (
            <div className="p-5">
              <p className="text-xs text-muted-foreground mb-3">Last 12 months of transactions</p>
              <div className="space-y-px">
                {MOCK_HISTORY.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${entry.type === "refund" ? "bg-green-100" : "bg-muted"}`}>
                        {entry.type === "refund"
                          ? <ArrowRight className="w-3.5 h-3.5 text-green-600 rotate-180" />
                          : <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground leading-tight">{entry.description}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{entry.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold tabular-nums ${entry.type === "refund" ? "text-green-600" : "text-foreground"}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {entry.type === "refund" ? "+" : "-"}${entry.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <button className="w-full flex items-center justify-center gap-2 py-2 rounded border border-border text-sm font-medium text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
