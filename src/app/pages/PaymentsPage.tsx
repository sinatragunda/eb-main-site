import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  CheckCircle,
  CreditCard,
  Landmark,
  Wallet,
  Lock,
  Shield,
  Building2,
  Check,
  Mail,
  AlertCircle,
  CircleDollarSign,
  CheckCircle2,
} from "lucide-react";
import { GOLD, NAVY, TEAL } from "../constants/brand";
import { useCart } from "../context/CartContext";

export function PaymentsPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const goBack = () => navigate("/marketplace");
  const goSuccess = () => navigate("/marketplace", { state: { openAccount: true } });

  const [payMethod, setPayMethod] = useState<"card" | "bank" | "wallet">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Zimbabwe");
  const [zip, setZip] = useState("");
  const [saving, setSaving] = useState(false);
  const [paid, setPaid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartItems.reduce((s, i) => s + i.price, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  // Card type detection from first digit
  const cardType = cardNumber.startsWith("4") ? "visa"
    : cardNumber.startsWith("5") ? "mastercard"
    : cardNumber.startsWith("3") ? "amex"
    : null;

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = "Email is required";
    if (payMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) e.card = "Enter a valid 16-digit card number";
      if (expiry.replace(/\s\/\s/g, "").length < 4) e.expiry = "Enter a valid expiry date";
      if (cvv.length < 3) e.cvv = "Enter a valid CVV";
      if (!cardName) e.cardName = "Cardholder name is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => { setSaving(false); setPaid(true); }, 2000);
  };

  // ── Success screen ──
  if (paid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#f3f6f8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="bg-white rounded-2xl shadow-sm border border-border p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#ddf0f4" }}>
            <CheckCircle className="w-8 h-8" style={{ color: TEAL }} />
          </div>
          <div style={{ width: 36, height: 4, backgroundColor: GOLD, borderRadius: 2, margin: "0 auto 16px" }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Payment Successful!</h2>
          <p className="text-muted-foreground text-sm mb-2">
            Your payment of <span className="font-bold text-foreground">${total.toFixed(2)}</span> has been processed.
          </p>
          <p className="text-muted-foreground text-xs mb-6">A confirmation receipt has been sent to <span className="font-semibold text-foreground">{email || "your email"}</span>.</p>
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left space-y-1">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{item.serviceName} – {item.tierName}</span>
                <span className="font-medium text-foreground">{item.price === 0 ? "Free" : `$${item.price.toFixed(2)}${item.period}`}</span>
              </div>
            ))}
          </div>
          <button
            onClick={goSuccess}
            className="w-full py-3 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: TEAL }}
          >
            Go to My Account
          </button>
          <button onClick={goBack} className="mt-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Back to marketplace
          </button>
        </div>
      </div>
    );
  }

  const inputCls = (field: string) =>
    `w-full px-3 py-2.5 text-sm border rounded-lg outline-none bg-white text-foreground placeholder:text-muted-foreground transition-colors ${errors[field] ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-border focus:ring-1 focus:border-transparent"}`;

  const CardLogos = () => (
    <div className="flex items-center gap-1.5">
      {/* Visa */}
      <div className={`px-2 py-1 rounded border text-[10px] font-black tracking-tight transition-all ${cardType === "visa" || !cardType ? "border-[#1a1f71] text-[#1a1f71]" : "border-border text-muted-foreground opacity-40"}`}>
        VISA
      </div>
      {/* Mastercard */}
      <div className={`flex items-center gap-0.5 transition-all ${cardType === "mastercard" || !cardType ? "opacity-100" : "opacity-30"}`}>
        <div className="w-5 h-5 rounded-full bg-[#eb001b]" />
        <div className="w-5 h-5 rounded-full bg-[#f79e1b] -ml-2.5" />
      </div>
      {/* Amex */}
      <div className={`px-2 py-1 rounded border text-[10px] font-black tracking-tight transition-all ${cardType === "amex" || !cardType ? "border-[#007bc1] text-[#007bc1]" : "border-border text-muted-foreground opacity-40"}`}>
        AMEX
      </div>
      {/* Stripe badge */}
      <div className="px-2 py-1 rounded border border-[#635bff] text-[10px] font-black text-[#635bff]">
        stripe
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f3f6f8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to cart
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ backgroundColor: NAVY }}>
              <Building2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: NAVY }}>BFSI Vainona · Secure Checkout</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" style={{ color: TEAL }} />
            SSL Secured
          </div>
        </div>
      </div>

      {/* Progress steps */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-xs">
          {["Cart", "Payment Details", "Confirmation"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              {i > 0 && <div className="w-8 h-px bg-border" />}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={i <= 1 ? { backgroundColor: TEAL, color: "white" } : { backgroundColor: "#e5e7eb", color: "#9ca3af" }}
                >
                  {i === 0 ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={i === 1 ? "font-semibold text-foreground" : i === 0 ? "text-muted-foreground" : "text-muted-foreground/50"}>{step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-8 grid lg:grid-cols-[1fr_360px] gap-8 items-start">

        {/* ── LEFT: Payment form ── */}
        <form onSubmit={handlePay} className="space-y-6">

          {/* Contact */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-bold text-base mb-4" style={{ color: NAVY }}>Contact Information</h2>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`${inputCls("email")} pl-9`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Payment method tabs */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base" style={{ color: NAVY }}>Payment Method</h2>
              <CardLogos />
            </div>

            {/* Tabs */}
            <div className="flex rounded-lg border border-border overflow-hidden mb-6">
              {([
                { id: "card", label: "Credit / Debit Card", icon: <CreditCard className="w-4 h-4" /> },
                { id: "bank", label: "Bank Transfer", icon: <Landmark className="w-4 h-4" /> },
                { id: "wallet", label: "Digital Wallet", icon: <Wallet className="w-4 h-4" /> },
              ] as const).map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayMethod(m.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors ${i > 0 ? "border-l border-border" : ""}`}
                  style={payMethod === m.id ? { backgroundColor: NAVY, color: "white" } : { color: "#52708a" }}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {/* Card form */}
            {payMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Card number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`${inputCls("card")} pl-9 tracking-widest`}
                    />
                  </div>
                  {errors.card && <p className="text-xs text-red-500 mt-1">{errors.card}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Expiry date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM / YY"
                      maxLength={7}
                      className={inputCls("expiry")}
                    />
                    {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">CVV / CVC</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="•••"
                        maxLength={4}
                        className={inputCls("cvv")}
                      />
                    </div>
                    {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Cardholder name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name as it appears on card"
                    className={inputCls("cardName")}
                  />
                  {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
                </div>
              </div>
            )}

            {/* Bank Transfer */}
            {payMethod === "bank" && (
              <div className="rounded-lg border border-border p-5 space-y-3 text-sm">
                <p className="font-semibold text-foreground mb-3">Transfer to our account</p>
                {[
                  { label: "Bank Name", value: "BFSI Vainona Bank Ltd." },
                  { label: "Account Name", value: "BFSI Company of Vainona" },
                  { label: "Account Number", value: "007 823 412 00" },
                  { label: "Sort Code / SWIFT", value: "VN-BFS-001 / VAINBFSI" },
                  { label: "Reference", value: `ORD-${Date.now().toString().slice(-6)}` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                    <span className="text-muted-foreground text-xs">{row.label}</span>
                    <span className="font-semibold text-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{row.value}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">Transfers can take 1–3 business days. Your subscriptions activate once payment is confirmed.</p>
                </div>
              </div>
            )}

            {/* Digital Wallet */}
            {payMethod === "wallet" && (
              <div className="space-y-3">
                {[
                  { name: "Google Pay", color: "#4285F4", icon: (
                    <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                      <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </svg>
                  )},
                  { name: "Apple Pay", color: "#000000", icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  )},
                  { name: "PayPal", color: "#003087", icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#003087" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.067 8.478c.492.88.556 2.014.271 3.11-.812 3.27-3.475 4.406-6.91 4.406h-.481a.825.825 0 00-.817.701l-.552 3.46-.16 1.006H9.31l.21-1.324.788-4.938a.5.5 0 01.494-.425h1.147c3.632 0 6.474-1.473 7.303-5.74a4.6 4.6 0 01.815-.256z"/>
                      <path d="M18.326 7.28a5.985 5.985 0 00-.623-.234 7.89 7.89 0 00-2.019-.245H10.27a.826.826 0 00-.816.7L7.965 17.35l-.054.34a.825.825 0 00.816.95h2.866l.721-4.57-.022.143a.825.825 0 01.816-.701h1.7c3.341 0 5.956-1.358 6.722-5.286.023-.116.042-.229.059-.34a5.04 5.04 0 00-.77-.605z"/>
                    </svg>
                  )},
                ].map((w) => (
                  <button
                    key={w.name}
                    type="button"
                    onClick={() => { setSaving(true); setTimeout(() => { setSaving(false); setPaid(true); }, 1500); }}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-border bg-white font-semibold text-sm hover:bg-muted transition-colors"
                  >
                    {w.icon}
                    <span>Pay with {w.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Billing address */}
          {payMethod === "card" && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-bold text-base mb-4" style={{ color: NAVY }}>Billing Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-lg outline-none bg-white text-foreground focus:ring-1"
                    style={{ ["--tw-ring-color" as string]: TEAL }}
                  >
                    {["Zimbabwe", "South Africa", "United Kingdom", "United States", "Kenya", "Nigeria", "Ghana"].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">ZIP / Postal code</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="00263"
                    className={inputCls("zip")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pay button — card only (wallets have their own) */}
          {payMethod !== "wallet" && (
            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 rounded-xl text-white font-bold text-base transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 shadow-md"
              style={{ backgroundColor: TEAL }}
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  {payMethod === "bank" ? "Confirm & Get Account Details" : `Pay $${total.toFixed(2)} Securely`}
                </>
              )}
            </button>
          )}
        </form>

        {/* ── RIGHT: Order summary ── */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <div style={{ width: 32, height: 3, backgroundColor: GOLD, borderRadius: 2, marginBottom: 12 }} />
            <h3 className="font-bold text-base mb-4" style={{ color: NAVY }}>Order Summary</h3>

            {cartItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            ) : (
              <div className="space-y-3 mb-4">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">{item.serviceName}</p>
                      <p className="text-xs text-muted-foreground">{item.tierName} plan</p>
                    </div>
                    <span className="text-sm font-bold text-foreground flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}${item.period}`}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>${subtotal.toFixed(2)}/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (15%)</span>
                <span className="font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-border pt-2 mt-1">
                <span className="font-bold text-foreground">Total due today</span>
                <span className="text-xl font-extrabold" style={{ color: NAVY, fontFamily: "'JetBrains Mono', monospace" }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Security badges */}
          <div className="bg-white rounded-xl border border-border p-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Security & Compliance</p>
            {[
              { icon: <Lock className="w-4 h-4" />, label: "256-bit SSL Encryption", sub: "All data transmitted securely" },
              { icon: <Shield className="w-4 h-4" />, label: "PCI DSS Level 1", sub: "Highest card data standard" },
              { icon: <CircleDollarSign className="w-4 h-4" />, label: "Powered by Stripe", sub: "Payments processed by Stripe Inc." },
              { icon: <CheckCircle2 className="w-4 h-4" />, label: "FCA Regulated", sub: "No. 782341 — BFSI Vainona" },
            ].map((b) => (
              <div key={b.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0" style={{ color: TEAL }}>{b.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{b.label}</p>
                  <p className="text-[11px] text-muted-foreground">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-muted-foreground text-center leading-relaxed px-2">
            By completing your purchase you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">Terms of Service</a> and{" "}
            <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
