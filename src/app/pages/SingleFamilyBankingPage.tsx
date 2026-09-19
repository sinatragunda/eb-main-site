import { useNavigate } from "react-router";
import {
  Building2,
  CreditCard,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Check,
  ArrowRight,
} from "lucide-react";
import { GOLD, NAVY, TEAL } from "../constants/brand";
import { SharedNav } from "../components/layout/SharedNav";
import { SharedFooter } from "../components/layout/SharedFooter";

export function SingleFamilyBankingPage() {
  const navigate = useNavigate();
  const goToMarketplace = () => navigate("/marketplace");
  const goHome = () => navigate("/");

  const products = [
    {
      name: "Home Purchase Loan",
      icon: <Building2 className="w-6 h-6" />,
      rate: "From 6.4% p.a.",
      tag: "Most Popular",
      features: ["Up to 95% LTV", "30-year terms", "Fixed or variable rate", "Pre-approval in 24hrs", "No early repayment fee"],
      desc: "Competitive mortgages for first-time buyers and existing homeowners looking to move or remortgage.",
    },
    {
      name: "Personal Current Account",
      icon: <CreditCard className="w-6 h-6" />,
      rate: "No monthly fee",
      tag: "Everyday Banking",
      features: ["Instant account opening", "Visa debit card", "Overdraft facility", "Mobile & online banking", "Cashback on bills"],
      desc: "A flexible everyday account with zero fees, real-time notifications, and built-in budgeting tools.",
    },
    {
      name: "Vehicle Finance",
      icon: <Zap className="w-6 h-6" />,
      rate: "From 7.9% p.a.",
      tag: "New",
      features: ["New & used vehicles", "Up to 72 months", "No deposit option", "Same-day approval", "EV rebate available"],
      desc: "Finance your next car, van, or electric vehicle with flexible repayment terms and competitive rates.",
    },
    {
      name: "Education Savings Plan",
      icon: <Shield className="w-6 h-6" />,
      rate: "4.75% interest",
      tag: "Tax-Efficient",
      features: ["Tax-free growth", "Flexible contributions", "Government top-up", "No lock-in period", "Junior & adult plans"],
      desc: "Save for school fees, university costs, or professional qualifications with a dedicated education account.",
    },
    {
      name: "Family Life Cover",
      icon: <Users className="w-6 h-6" />,
      rate: "From $12/mo",
      tag: "Protection",
      features: ["Up to $1M cover", "Critical illness add-on", "Income protection", "Child benefit rider", "No medical exam under 45"],
      desc: "Protect what matters most. A whole-of-life policy that pays out when your family needs it most.",
    },
    {
      name: "Savings & Investments",
      icon: <TrendingUp className="w-6 h-6" />,
      rate: "Up to 5.2% p.a.",
      tag: "High Yield",
      features: ["Easy-access savings", "Fixed-term deposits", "ISA wrapper", "Auto-invest option", "FSCS protected"],
      desc: "Grow your wealth with competitive savings rates and low-cost investment portfolios managed by our advisors.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 460 }}>
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&h=600&fit=crop&auto=format"
            alt="Family home"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(13,51,73,0.96) 40%, rgba(13,51,73,0.6) 60%, rgba(13,51,73,0.1) 80%, transparent 100%)` }} />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-8 py-16 flex items-center" style={{ minHeight: 460 }}>
          <div className="max-w-lg text-white">
            <div style={{ width: 48, height: 4, backgroundColor: GOLD, marginBottom: 20, borderRadius: 2 }} />
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Single-Family Banking</p>
            <h1 className="text-4xl font-bold leading-tight mb-4">Banking built around your family&apos;s future</h1>
            <p className="text-white/80 text-base leading-relaxed mb-7 max-w-md">
              From your first home to your children&apos;s education — we offer personal banking, home loans, vehicle finance, and protection plans tailored to every stage of family life.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={goToMarketplace} className="flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: TEAL }}>
                Open an Account <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 border-2 border-white/60 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:border-white transition-colors">
                Speak to an Advisor
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 bg-white pointer-events-none" style={{ width: 120, height: 120, borderRadius: "100% 0 0 0" }} />
      </section>

      {/* Stats strip */}
      <div style={{ backgroundColor: NAVY }} className="text-white">
        <div className="max-w-screen-xl mx-auto px-8 py-7 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {[
            { label: "Home Loans Issued", value: "8,400+" },
            { label: "Avg. Approval Time", value: "24 hrs" },
            { label: "Customer Satisfaction", value: "98.2%" },
            { label: "Avg. Rate Saving", value: "1.4%" },
          ].map((s) => (
            <div key={s.label} className="pl-8 first:pl-0">
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-xs text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <section className="max-w-screen-xl mx-auto px-8 py-16">
        <div className="mb-10">
          <div style={{ width: 36, height: 4, backgroundColor: GOLD, marginBottom: 14, borderRadius: 2 }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Personal Banking Products</h2>
          <p className="text-muted-foreground text-sm max-w-xl">Everything a family needs under one roof — from daily banking to long-term wealth.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.name} className="border border-border rounded-xl p-5 flex flex-col hover:shadow-md transition-shadow bg-white">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#ddf0f4", color: TEAL }}>
                  {p.icon}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#ddf0f4", color: TEAL }}>
                  {p.tag}
                </span>
              </div>
              <h3 className="font-bold text-foreground mb-1">{p.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
              <p className="text-lg font-extrabold mb-3" style={{ color: NAVY }}>{p.rate}</p>
              <ul className="space-y-1.5 mb-5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: TEAL }} /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={goToMarketplace}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility strip */}
      <div className="bg-muted/40 border-y border-border">
        <div className="max-w-screen-xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div style={{ width: 36, height: 4, backgroundColor: GOLD, marginBottom: 12, borderRadius: 2 }} />
            <h2 className="text-xl font-bold mb-1" style={{ color: NAVY }}>Check your eligibility in 2 minutes</h2>
            <p className="text-sm text-muted-foreground">No credit impact. Instant indicative results. A real advisor contacts you within the hour.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button onClick={goToMarketplace} className="px-6 py-3 text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity" style={{ backgroundColor: TEAL }}>
              Check Eligibility
            </button>
            <button onClick={goHome} className="px-6 py-3 text-sm font-semibold rounded-full border border-border text-foreground hover:bg-muted transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}
