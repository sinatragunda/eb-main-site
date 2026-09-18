import { useState, useMemo, useCallback, useEffect, useRef, memo } from "react";
import {
  ShoppingCart,
  X,
  Star,
  Check,
  ChevronDown,
  Search,
  Shield,
  Cloud,
  Mail,
  BarChart3,
  Globe,
  Database,
  Zap,
  Bell,
  HardDrive,
  Lock,
  Server,
  Cpu,
  Package,
  Trash2,
  ArrowRight,
  Tag,
  UserCircle,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  LogOut,
  Settings,
  LayoutGrid,
  Building2,
  Users,
  TrendingUp,
  Eye,
  EyeOff,
  KeyRound,
  ChevronLeft,
  Banknote,
  Wallet,
  CheckCircle,
  Landmark,
  CircleDollarSign,
} from "lucide-react";

const GOLD = "#f5a21e";
const NAVY = "#0d3349";
const TEAL = "#0097b2";

function SharedNav({
  activePage,
  onHome,
  onSingleFamily,
  onEnter,
  onLogin,
}: {
  activePage: string;
  onHome: () => void;
  onSingleFamily: () => void;
  onEnter: () => void;
  onLogin: () => void;
}) {
  const navItems = [
    { label: "Home", action: onHome },
    { label: "Single-Family Banking", action: onSingleFamily },
    { label: "Multifamily Business", action: () => {} },
    { label: "Capital Markets", action: () => {} },
    { label: "Individual & Families", action: () => {} },
  ];

  return (
    <>
      <div style={{ backgroundColor: NAVY }} className="text-white/75 text-xs hidden md:block">
        <div className="max-w-screen-xl mx-auto px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`hover:text-white transition-colors ${activePage === item.label ? "text-white font-semibold border-b border-white pb-0.5" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            {["About Us", "Data and Insights", "Newsroom", "Careers", "Contact Us"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto px-8 py-3.5 flex items-center justify-between">
          <button onClick={onHome} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: NAVY }}>
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm leading-tight block" style={{ color: NAVY }}>BFSI Vainona</span>
              <span className="text-[10px] text-muted-foreground leading-none">BFSI Company of Vainona</span>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-6">
            {["Financing Options", "Our Services", "News & Insights", "Learning Center"].map((item) => (
              <a key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
            ))}
            <Search className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <button
              onClick={onLogin}
              className="px-5 py-2 text-sm font-semibold rounded-full border-2 transition-colors hover:opacity-80"
              style={{ borderColor: TEAL, color: TEAL }}
            >
              Login
            </button>
            <button
              onClick={onEnter}
              className="px-5 py-2 text-white text-sm font-semibold rounded-full transition-colors hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              Client Portal
            </button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button onClick={onLogin} className="px-3 py-1.5 text-sm font-semibold rounded-full border-2" style={{ borderColor: TEAL, color: TEAL }}>
              Login
            </button>
            <button onClick={onEnter} className="px-3 py-1.5 text-white text-sm font-semibold rounded-full" style={{ backgroundColor: TEAL }}>
              Portal
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

function SharedFooter() {
  return (
    <div style={{ backgroundColor: "#071e2c" }} className="text-white">
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
        <span>© 2026 BFSI Company of Vainona. All rights reserved.</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>FCA No. 782341</span>
      </div>
    </div>
  );
}

function SingleFamilyBankingPage({
  onHome,
  onSingleFamily,
  onEnter,
  onLogin,
}: {
  onHome: () => void;
  onSingleFamily: () => void;
  onEnter: () => void;
  onLogin: () => void;
}) {
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
      <SharedNav activePage="Single-Family Banking" onHome={onHome} onSingleFamily={onSingleFamily} onEnter={onEnter} onLogin={onLogin} />

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
              <button onClick={onEnter} className="flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: TEAL }}>
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
                onClick={onEnter}
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
            <button onClick={onEnter} className="px-6 py-3 text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity" style={{ backgroundColor: TEAL }}>
              Check Eligibility
            </button>
            <button onClick={onHome} className="px-6 py-3 text-sm font-semibold rounded-full border border-border text-foreground hover:bg-muted transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=700&fit=crop&auto=format",
    tag: "Banking & Finance",
    heading: "Stay ahead of market volatility",
    body: "Get early certainty and financial confidence with BFSI Vainona’s integrated banking, insurance, and digital infrastructure services.",
    cta: "Learn how it works",
  },
  {
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&h=700&fit=crop&auto=format",
    tag: "Business Banking",
    heading: "Banking built for your business",
    body: "From working capital to trade finance — access enterprise-grade accounts, FX conversions, and automated treasury tools in one platform.",
    cta: "Explore business banking",
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=700&fit=crop&auto=format",
    tag: "Insurance Services",
    heading: "Protection for every risk you face",
    body: "Comprehensive liability, property, cyber, and life cover — designed so your business never has a gap in protection.",
    cta: "View insurance plans",
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=700&fit=crop&auto=format",
    tag: "Digital Infrastructure",
    heading: "Infrastructure you can trust at scale",
    body: "Cloud hosting, managed databases, CDN delivery, and real-time monitoring — all backed by financial-grade security and 99.98% uptime.",
    cta: "Browse services",
  },
];

function LandingPage({ onEnter, onSingleFamily, onLogin }: { onEnter: () => void; onSingleFamily: () => void; onLogin: () => void }) {
  const financialServices = [
    { title: "Business Banking", desc: "Current accounts, business loans, trade finance, and treasury management for SMEs and enterprise." },
    { title: "Cloud Infrastructure", desc: "Scalable hosting, managed databases, and CDN delivery backed by financial-grade security." },
    { title: "Analytics & Reporting", desc: "Real-time dashboards and performance monitoring — data you can act on immediately." },
    { title: "Cybersecurity", desc: "SSL certificates, WAF protection, and compliance reporting to keep your data safe." },
    { title: "Digital Acceleration", desc: "Email marketing, API gateways, and CDN delivery to grow your digital presence." },
    { title: "Payments & Treasury", desc: "Multi-currency accounts, FX conversions, and automated reconciliation." },
  ];

  const insuranceServices = [
    { title: "Business Liability", desc: "Public and product liability cover protecting your business from third-party claims and legal costs." },
    { title: "Property & Assets", desc: "Comprehensive cover for office premises, equipment, and assets against damage or theft." },
    { title: "Life & Health Cover", desc: "Group life, critical illness, and health policies tailored for employers who value their team." },
    { title: "Cyber Insurance", desc: "Cover for data breaches, ransomware attacks, and regulatory fines." },
    { title: "Trade & Export Cover", desc: "Protect cross-border transactions and overseas operations with trade credit insurance." },
    { title: "Business Interruption", desc: "Income protection that keeps your business afloat when unexpected events strike." },
  ];

  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setSlide(index);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const prev = useCallback(() => goTo((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [slide, goTo]);
  const next = useCallback(() => goTo((slide + 1) % HERO_SLIDES.length), [slide, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [slide, paused, next]);

  const current = HERO_SLIDES[slide];

  return (
    <div className="min-h-screen bg-white text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      <SharedNav activePage="Multifamily Business" onHome={() => {}} onSingleFamily={onSingleFamily} onEnter={onEnter} onLogin={onLogin} />

      {/* ── Hero carousel ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: 520 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides — stack all images, show active via opacity */}
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{ opacity: i === slide ? 1 : 0 }}
          >
            <img src={s.image} alt={s.heading} className="w-full h-full object-cover object-center" />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to right, rgba(13,51,73,0.97) 42%, rgba(13,51,73,0.65) 62%, rgba(13,51,73,0.15) 82%, transparent 100%)` }}
            />
          </div>
        ))}

        {/* Content — fades with slide */}
        <div className="relative max-w-screen-xl mx-auto px-8 py-20 flex items-center" style={{ minHeight: 520 }}>
          <div
            className="max-w-lg text-white transition-all duration-500"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "translateY(0)" }}
          >
            <div style={{ width: 48, height: 4, backgroundColor: GOLD, marginBottom: 12, borderRadius: 2 }} />
            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {current.tag}
            </p>
            <h1 className="text-4xl font-bold leading-tight mb-5">{current.heading}</h1>
            <p className="text-white/80 text-base leading-relaxed mb-8 max-w-md">{current.body}</p>
            <button
              onClick={onEnter}
              className="flex items-center gap-2 border-2 border-white text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white transition-colors group"
            >
              <span className="group-hover:text-[#0d3349] transition-colors">{current.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:text-[#0d3349] transition-colors" />
            </button>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 right-8 flex items-center gap-2.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === slide ? 24 : 10,
                height: 10,
                backgroundColor: i === slide ? "white" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 pointer-events-none">
          <div
            className="h-full bg-white/50 transition-none"
            style={{
              width: paused ? undefined : "100%",
              animation: paused ? "none" : "none",
              transition: paused ? "none" : "width 5s linear",
              key: slide,
            } as React.CSSProperties}
          />
        </div>

        {/* White rounded corner — bottom right */}
        <div className="absolute bottom-0 right-0 bg-white pointer-events-none" style={{ width: 140, height: 140, borderRadius: "100% 0 0 0" }} />
      </section>

      {/* ── Stats strip ── */}
      <div style={{ backgroundColor: NAVY }} className="text-white">
        <div className="max-w-screen-xl mx-auto px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {[
            { label: "Clients Served", value: "14,000+" },
            { label: "Years Operating", value: "28 yrs" },
            { label: "Assets Managed", value: "$4.2B" },
            { label: "Service Uptime", value: "99.98%" },
          ].map((s) => (
            <div key={s.label} className="pl-8 first:pl-0">
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-xs text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Editorial section — Services Set the Standard ── */}
      <section className="max-w-screen-xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              BFSI Vainona Sets the Standard
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For over 28 years, BFSI Company of Vainona has been a trusted source of financial services and digital infrastructure for businesses across the region. We are at the forefront of enterprise banking and insurance, offering a full-spectrum suite of services that help clients operate with confidence and scale without limits.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: TEAL }}>Our clients raise the bar</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              As one of the region&apos;s leading financial services groups, we are a trusted guarantor of business continuity and growth. Our integrated approach — called &quot;The Platform We All Build On&quot; — ensures that every client gets a joined-up solution covering banking, insurance, cloud, and compliance.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* ── FINANCIAL SERVICES ── */}
      <section id="financial" className="max-w-screen-xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16">
          <div className="md:pt-2">
            {/* Gold accent bar */}
            <div style={{ width: 36, height: 4, backgroundColor: GOLD, marginBottom: 16, borderRadius: 2 }} />
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: NAVY, backgroundColor: "#ddf0f4", fontFamily: "'JetBrains Mono', monospace" }}>
              <Building2 className="w-3 h-3" /> Financial Services
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: NAVY }}>Banking & Digital Infrastructure</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Everything that keeps your operations running — from business accounts to cloud infrastructure.
            </p>
            <button onClick={onEnter} className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: TEAL }}>
              View all plans <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
            {financialServices.map((svc, i) => (
              <div key={svc.title} className="py-5 border-b border-border">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-muted-foreground/40 mt-0.5 w-5 flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{svc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* ── INSURANCE SERVICES ── */}
      <section id="insurance" className="max-w-screen-xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16">
          <div className="md:pt-2">
            <div style={{ width: 36, height: 4, backgroundColor: GOLD, marginBottom: 16, borderRadius: 2 }} />
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#0d6e4a", backgroundColor: "#d8f5eb", fontFamily: "'JetBrains Mono', monospace" }}>
              <Shield className="w-3 h-3" /> Insurance Services
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: NAVY }}>Protection for Every Risk</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Flexible policies covering life, property, cyber, and liability — designed so your business never has a gap in coverage.
            </p>
            <button onClick={onEnter} className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: TEAL }}>
              View all plans <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
            {insuranceServices.map((svc, i) => (
              <div key={svc.title} className="py-5 border-b border-border">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-muted-foreground/40 mt-0.5 w-5 flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{svc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <div id="about" className="bg-muted/40 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-xl overflow-hidden h-72 bg-muted shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format"
              alt="Modern financial office"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div style={{ width: 36, height: 4, backgroundColor: GOLD, marginBottom: 16, borderRadius: 2 }} />
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: TEAL, fontFamily: "'JetBrains Mono', monospace" }}>About Us</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: NAVY }}>A Partner You Can Rely On</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Founded in 1998, our firm has grown from a regional lender into a full-spectrum financial services group — combining the stability of traditional banking with the agility of modern technology.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Whether you are a startup or an enterprise managing complex treasury operations, we have a service built for you.
            </p>
            <div className="flex flex-wrap gap-2">
              {["FCA Regulated", "ISO 27001 Certified", "GDPR Compliant", "SOC 2 Type II"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: "#ddf0f4", color: TEAL }}>
                  <Check className="w-3 h-3" /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div style={{ backgroundColor: NAVY }}>
        <div className="max-w-screen-xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div style={{ width: 36, height: 4, backgroundColor: GOLD, marginBottom: 16, borderRadius: 2 }} />
            <h2 className="text-2xl font-bold text-white mb-1">Ready to Get Started?</h2>
            <p className="text-white/50 text-sm">Transparent pricing · No hidden fees · Cancel anytime</p>
          </div>
          <button
            onClick={onEnter}
            className="flex-shrink-0 flex items-center gap-2 px-7 py-3 text-white font-bold rounded-full text-sm transition-colors hover:opacity-90"
            style={{ backgroundColor: TEAL }}
          >
            <ShoppingCart className="w-4 h-4" /> Go to Services & Cart
          </button>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}

type PricingTier = {
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
};

type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  rating: number;
  reviews: number;
  tiers: PricingTier[];
  badge?: string;
};

type CartItem = {
  serviceId: string;
  serviceName: string;
  tierName: string;
  price: number;
  period: string;
};

const SERVICES: Service[] = [
  {
    id: "cloud-storage",
    name: "Virtual Environment",
    category: "Storage",
    description: "Scalable object storage for any amount of data. High durability with 99.999999999% availability.",
    icon: <Cloud className="w-6 h-6" />,
    rating: 4.8,
    reviews: 12847,
    badge: "Best Seller",
    tiers: [
      { name: "Starter", price: 9.99, period: "/mo", features: ["100 GB storage", "1 TB transfer", "99.9% uptime SLA", "Basic support"] },
      { name: "Professional", price: 29.99, period: "/mo", features: ["1 TB storage", "10 TB transfer", "99.99% uptime SLA", "Priority support", "Versioning"], popular: true },
      { name: "Enterprise", price: 99.99, period: "/mo", features: ["Unlimited storage", "Unlimited transfer", "99.999% uptime SLA", "24/7 dedicated support", "Versioning", "Custom domain"] },
    ],
  },
  {
    id: "web-hosting",
    name: "Web Hosting",
    category: "Hosting",
    description: "High-performance managed web hosting with automatic scaling and global CDN included.",
    icon: <Globe className="w-6 h-6" />,
    rating: 4.6,
    reviews: 8921,
    tiers: [
      { name: "Starter", price: 4.99, period: "/mo", features: ["1 website", "10 GB SSD", "Free SSL", "Email support"] },
      { name: "Professional", price: 14.99, period: "/mo", features: ["5 websites", "50 GB SSD", "Free SSL", "CDN included", "Phone support"], popular: true },
      { name: "Enterprise", price: 49.99, period: "/mo", features: ["Unlimited websites", "200 GB SSD", "Free SSL", "CDN + WAF", "Dedicated account manager", "Daily backups"] },
    ],
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    category: "Marketing",
    description: "Send beautiful email campaigns, automate sequences, and track performance with advanced analytics.",
    icon: <Mail className="w-6 h-6" />,
    rating: 4.7,
    reviews: 5432,
    badge: "Popular",
    tiers: [
      { name: "Starter", price: 0, period: "/mo", features: ["500 contacts", "1,000 emails/mo", "Basic templates", "Open rate tracking"] },
      { name: "Professional", price: 19.99, period: "/mo", features: ["10,000 contacts", "100,000 emails/mo", "Advanced templates", "A/B testing", "Automation workflows"], popular: true },
      { name: "Enterprise", price: 79.99, period: "/mo", features: ["Unlimited contacts", "Unlimited emails", "Custom templates", "Advanced automation", "Dedicated IP", "Account manager"] },
    ],
  },
  {
    id: "seo-analytics",
    name: "SEO Analytics",
    category: "Analytics",
    description: "Rank higher on search engines. Track keywords, backlinks, and competitors with real-time data.",
    icon: <BarChart3 className="w-6 h-6" />,
    rating: 4.5,
    reviews: 3210,
    tiers: [
      { name: "Starter", price: 14.99, period: "/mo", features: ["100 keywords", "5 projects", "Weekly reports", "Competitor tracking"] },
      { name: "Professional", price: 44.99, period: "/mo", features: ["1,000 keywords", "25 projects", "Daily reports", "Competitor tracking", "Backlink monitor"], popular: true },
      { name: "Enterprise", price: 149.99, period: "/mo", features: ["Unlimited keywords", "Unlimited projects", "Real-time reports", "White-label reports", "API access", "Priority indexing"] },
    ],
  },
  {
    id: "ssl-certificate",
    name: "SSL Certificate",
    category: "Security",
    description: "Protect your domain with industry-standard TLS encryption. Trusted by all major browsers.",
    icon: <Lock className="w-6 h-6" />,
    rating: 4.9,
    reviews: 21034,
    tiers: [
      { name: "Starter", price: 0, period: "/yr", features: ["Domain Validated (DV)", "1 domain", "Auto-renewal", "Browser trusted"] },
      { name: "Professional", price: 49.99, period: "/yr", features: ["Organization Validated (OV)", "5 domains", "Auto-renewal", "Business verification", "Trust seal"], popular: true },
      { name: "Enterprise", price: 199.99, period: "/yr", features: ["Extended Validation (EV)", "Wildcard domains", "Auto-renewal", "Green address bar", "Priority issuance", "24/7 support"] },
    ],
  },
  {
    id: "database",
    name: "Managed Database",
    category: "Hosting",
    description: "Fully managed PostgreSQL and MySQL clusters with automated backups and one-click scaling.",
    icon: <Database className="w-6 h-6" />,
    rating: 4.7,
    reviews: 6789,
    badge: "New",
    tiers: [
      { name: "Starter", price: 15, period: "/mo", features: ["1 vCPU", "1 GB RAM", "10 GB SSD", "Daily backups", "Basic monitoring"] },
      { name: "Professional", price: 60, period: "/mo", features: ["2 vCPU", "4 GB RAM", "80 GB SSD", "Hourly backups", "Advanced monitoring", "Read replicas"], popular: true },
      { name: "Enterprise", price: 240, period: "/mo", features: ["8 vCPU", "16 GB RAM", "500 GB SSD", "Continuous backups", "HA cluster", "Dedicated support", "Custom config"] },
    ],
  },
  {
    id: "cdn",
    name: "CDN Delivery",
    category: "Performance",
    description: "Deliver content 3x faster with 200+ edge locations worldwide. Reduce latency for every user.",
    icon: <Zap className="w-6 h-6" />,
    rating: 4.8,
    reviews: 9101,
    tiers: [
      { name: "Starter", price: 0, period: "/mo", features: ["1 TB bandwidth", "50 edge locations", "HTTP/2 support", "Basic analytics"] },
      { name: "Professional", price: 39.99, period: "/mo", features: ["10 TB bandwidth", "200 edge locations", "HTTP/3 support", "Advanced analytics", "Image optimization"], popular: true },
      { name: "Enterprise", price: 199.99, period: "/mo", features: ["Unlimited bandwidth", "200+ edge locations", "Custom rules", "Real-time analytics", "DDoS protection", "SLA guarantee"] },
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring & Alerts",
    category: "Operations",
    description: "24/7 uptime monitoring, performance tracking, and instant alerts when something goes wrong.",
    icon: <Bell className="w-6 h-6" />,
    rating: 4.6,
    reviews: 4567,
    tiers: [
      { name: "Starter", price: 0, period: "/mo", features: ["3 monitors", "5-min checks", "Email alerts", "7-day history"] },
      { name: "Professional", price: 24.99, period: "/mo", features: ["50 monitors", "1-min checks", "Email + SMS alerts", "90-day history", "Status page"], popular: true },
      { name: "Enterprise", price: 89.99, period: "/mo", features: ["Unlimited monitors", "30-sec checks", "All alert channels", "1-year history", "Custom status page", "On-call routing"] },
    ],
  },
  {
    id: "backup",
    name: "Backup & Recovery",
    category: "Storage",
    description: "Automated daily backups with one-click recovery. Never lose data again with military-grade encryption.",
    icon: <HardDrive className="w-6 h-6" />,
    rating: 4.7,
    reviews: 3891,
    tiers: [
      { name: "Starter", price: 5.99, period: "/mo", features: ["50 GB backup", "Daily backups", "7-day retention", "Basic recovery"] },
      { name: "Professional", price: 19.99, period: "/mo", features: ["500 GB backup", "Hourly backups", "30-day retention", "Priority recovery", "Encryption at rest"], popular: true },
      { name: "Enterprise", price: 69.99, period: "/mo", features: ["5 TB backup", "Continuous backups", "1-year retention", "Instant recovery", "Encryption + compliance", "Dedicated vault"] },
    ],
  },
  {
    id: "security-scan",
    name: "Security Scanning",
    category: "Security",
    description: "Automated vulnerability scanning, malware detection, and compliance reports for your infrastructure.",
    icon: <Shield className="w-6 h-6" />,
    rating: 4.5,
    reviews: 2145,
    tiers: [
      { name: "Starter", price: 12.99, period: "/mo", features: ["Weekly scans", "1 domain", "Vulnerability report", "Email alerts"] },
      { name: "Professional", price: 39.99, period: "/mo", features: ["Daily scans", "5 domains", "Full vulnerability report", "Malware removal", "Firewall"], popular: true },
      { name: "Enterprise", price: 149.99, period: "/mo", features: ["Continuous scans", "Unlimited domains", "Compliance reports", "Malware removal", "WAF", "Incident response"] },
    ],
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    category: "Developer",
    description: "Rate limit, authenticate, and monitor all your APIs from a single control plane. Scale with zero config.",
    icon: <Server className="w-6 h-6" />,
    rating: 4.6,
    reviews: 1987,
    badge: "New",
    tiers: [
      { name: "Starter", price: 0, period: "/mo", features: ["1M requests/mo", "3 APIs", "Basic auth", "Request logging"] },
      { name: "Professional", price: 49.99, period: "/mo", features: ["50M requests/mo", "20 APIs", "OAuth 2.0", "Advanced analytics", "Rate limiting"], popular: true },
      { name: "Enterprise", price: 199.99, period: "/mo", features: ["Unlimited requests", "Unlimited APIs", "Custom auth", "Real-time analytics", "SLA guarantee", "Dedicated cluster"] },
    ],
  },
  {
    id: "compute",
    name: "Compute Instances",
    category: "Hosting",
    description: "Blazing-fast virtual machines with NVMe SSD and 40 Gbps networking. Deploy in under 60 seconds.",
    icon: <Cpu className="w-6 h-6" />,
    rating: 4.8,
    reviews: 15230,
    tiers: [
      { name: "Starter", price: 6, period: "/mo", features: ["1 vCPU", "1 GB RAM", "25 GB SSD", "1 TB transfer", "Community support"] },
      { name: "Professional", price: 24, period: "/mo", features: ["2 vCPU", "4 GB RAM", "80 GB SSD", "4 TB transfer", "Email support", "Snapshots"], popular: true },
      { name: "Enterprise", price: 96, period: "/mo", features: ["8 vCPU", "16 GB RAM", "320 GB SSD", "10 TB transfer", "Priority support", "Snapshots", "Reserved pricing"] },
    ],
  },
];

const CATEGORIES = ["All", "Storage", "Hosting", "Marketing", "Analytics", "Security", "Performance", "Operations", "Developer"];
const SORT_OPTIONS = ["Most Popular", "Price: Low to High", "Price: High to Low", "Highest Rated"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5`}
          style={{ fill: s <= Math.round(rating) ? TEAL : "#e5e7eb", color: s <= Math.round(rating) ? TEAL : "#e5e7eb" }}
        />
      ))}
    </div>
  );
}

const ServiceCard = memo(function ServiceCard({
  service,
  onAddToCart,
  cartItems,
}: {
  service: Service;
  onAddToCart: (serviceId: string, tier: PricingTier) => void;
  cartItems: CartItem[];
}) {
  const [selectedTier, setSelectedTier] = useState(
    service.tiers.findIndex((t) => t.popular) >= 0 ? service.tiers.findIndex((t) => t.popular) : 0
  );

  const tier = service.tiers[selectedTier];
  const isInCart = cartItems.some((c) => c.serviceId === service.id && c.tierName === tier.name);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#ddf0f4", color: TEAL }}>
              {service.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm leading-tight">{service.name}</h3>
              <span className="text-xs text-muted-foreground">{service.category}</span>
            </div>
          </div>
          {service.badge && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
              service.badge === "New" ? "bg-blue-100 text-blue-700"
              : service.badge === "Best Seller" ? "text-white"
              : "bg-green-100 text-green-700"
            }`}
            style={service.badge === "Best Seller" ? { backgroundColor: NAVY } : undefined}
            >
              {service.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{service.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={service.rating} />
          <span className="text-xs font-medium" style={{ color: TEAL }}>{service.rating}</span>
          <span className="text-xs text-muted-foreground">({service.reviews.toLocaleString()})</span>
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="flex rounded-md border border-border overflow-hidden">
          {service.tiers.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setSelectedTier(i)}
              className={`flex-1 text-xs py-1.5 font-medium transition-colors relative ${i > 0 ? "border-l border-border" : ""}`}
              style={selectedTier === i
                ? { backgroundColor: NAVY, color: "white" }
                : { backgroundColor: "white", color: "#52708a" }}
            >
              {t.name}
              {t.popular && selectedTier !== i && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: TEAL }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="flex items-baseline gap-1">
          {tier.price === 0 ? (
            <span className="text-2xl font-bold" style={{ color: TEAL }}>Free</span>
          ) : (
            <>
              <span className="text-2xl font-bold text-foreground">${tier.price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground">{tier.period}</span>
            </>
          )}
          {tier.popular && (
            <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: "#ddf0f4", color: TEAL }}>
              Most Popular
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pt-2 pb-3 flex-1">
        <ul className="space-y-1">
          {tier.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="w-3 h-3 flex-shrink-0" style={{ color: TEAL }} />
              {f}
            </li>
          ))}
          {tier.features.length > 4 && (
            <li className="text-xs text-muted-foreground pl-4.5">+{tier.features.length - 4} more</li>
          )}
        </ul>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={() => onAddToCart(service.id, tier)}
          disabled={isInCart}
          className={`w-full py-2 rounded text-sm font-semibold transition-all active:scale-[0.98] ${
            isInCart ? "bg-muted text-muted-foreground cursor-default" : "text-white hover:opacity-90"
          }`}
          style={isInCart ? undefined : { backgroundColor: TEAL }}
        >
          {isInCart ? "✓ Added to cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
});

function CartPanel({
  isOpen,
  onClose,
  cartItems,
  onRemove,
  onQuantityChange,
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (index: number) => void;
  onQuantityChange: (index: number, delta: number) => void;
  onCheckout: () => void;
}) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-card shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="text-white px-5 py-4 flex items-center justify-between" style={{ backgroundColor: NAVY }}>
          <h2 className="text-lg font-bold">Your Cart ({cartItems.length})</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
            <Package className="w-12 h-12 text-muted-foreground/40" />
            <p className="font-semibold text-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add services from the catalog to get started.</p>
            <button onClick={onClose} className="mt-2 flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: TEAL }}>
              Browse services <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-3 space-y-px">
              {cartItems.map((item, i) => (
                <div key={i} className="px-5 py-3 hover:bg-muted/40 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground leading-tight">{item.serviceName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.tierName} plan</p>
                      <p className="text-sm font-bold text-foreground mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}${item.period}`}
                      </p>
                    </div>
                    <button onClick={() => onRemove(i)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-5 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
                  <span className="font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>${total.toFixed(2)}/mo</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> First month discount
                  </span>
                  <span className="text-green-600 font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>-$0.00</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline border-t border-border pt-3">
                <span className="font-bold text-foreground">Monthly Total</span>
                <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { onClose(); onCheckout(); }}
                className="w-full py-3 rounded text-white font-bold text-sm transition-colors hover:opacity-90 active:scale-[0.99] flex items-center justify-center gap-2"
                style={{ backgroundColor: TEAL }}
              >
                <Lock className="w-4 h-4" /> Proceed to Checkout
              </button>
              <button className="w-full py-2 rounded border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

type Subscription = {
  id: string;
  service: string;
  tier: string;
  price: number;
  period: string;
  status: "active" | "expiring" | "cancelled";
  renewsOn: string;
  startedOn: string;
};

type HistoryEntry = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "charge" | "refund";
};

const MOCK_ACCOUNT = {
  name: "James Okafor",
  email: "j.okafor@ebbanking.com",
  memberSince: "March 2022",
  plan: "Business",
};

const MOCK_SUBSCRIPTIONS: Subscription[] = [
  { id: "s1", service: "Cloud Storage", tier: "Professional", price: 29.99, period: "/mo", status: "active", renewsOn: "Aug 20, 2026", startedOn: "Jan 20, 2024" },
  { id: "s2", service: "Managed Database", tier: "Professional", price: 60, period: "/mo", status: "active", renewsOn: "Aug 20, 2026", startedOn: "Mar 5, 2024" },
  { id: "s3", service: "SSL Certificate", tier: "Professional", price: 49.99, period: "/yr", status: "expiring", renewsOn: "Aug 1, 2026", startedOn: "Aug 1, 2025" },
  { id: "s4", service: "Monitoring & Alerts", tier: "Starter", price: 0, period: "/mo", status: "active", renewsOn: "Aug 20, 2026", startedOn: "Jun 10, 2025" },
  { id: "s5", service: "Email Marketing", tier: "Starter", price: 0, period: "/mo", status: "cancelled", renewsOn: "—", startedOn: "Nov 3, 2023" },
];

const MOCK_HISTORY: HistoryEntry[] = [
  { id: "h1", date: "Jul 20, 2026", description: "Cloud Storage — Professional", amount: 29.99, type: "charge" },
  { id: "h2", date: "Jul 20, 2026", description: "Managed Database — Professional", amount: 60.00, type: "charge" },
  { id: "h3", date: "Jun 20, 2026", description: "Cloud Storage — Professional", amount: 29.99, type: "charge" },
  { id: "h4", date: "Jun 20, 2026", description: "Managed Database — Professional", amount: 60.00, type: "charge" },
  { id: "h5", date: "Jun 1, 2026", description: "Email Marketing — Refund", amount: 19.99, type: "refund" },
  { id: "h6", date: "May 20, 2026", description: "Cloud Storage — Professional", amount: 29.99, type: "charge" },
  { id: "h7", date: "Aug 1, 2025", description: "SSL Certificate — Professional (annual)", amount: 49.99, type: "charge" },
];

function AccountPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "subscriptions" | "history">("overview");

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
              <p className="font-semibold text-white">{MOCK_ACCOUNT.name}</p>
              <p className="text-xs text-white/60">{MOCK_ACCOUNT.email}</p>
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

function LoginPanel({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Please enter your email address."); return; }
    if (mode === "login" && !password) { setError("Please enter your password."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "login") {
        onSuccess();
        onClose();
      } else if (mode === "forgot") {
        setMode("login");
        setEmail("");
      } else {
        setMode("login");
      }
    }, 1200);
  };

  // Reset state when panel closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setMode("login"); setEmail(""); setPassword(""); setError(""); setLoading(false); setGoogleLoading(false); }, 300);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-card shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="px-6 py-5 text-white flex-shrink-0" style={{ backgroundColor: NAVY }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded flex items-center justify-center bg-white/10">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm leading-none">BFSI Vainona</p>
                <p className="text-white/50 text-[10px] mt-0.5">Secure Client Access</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode heading */}
          <div>
            <div style={{ width: 32, height: 3, backgroundColor: GOLD, borderRadius: 2, marginBottom: 10 }} />
            <h2 className="text-xl font-bold leading-tight">
              {mode === "login" && "Welcome back"}
              {mode === "forgot" && "Reset your password"}
              {mode === "register" && "Create an account"}
            </h2>
            <p className="text-white/60 text-xs mt-1">
              {mode === "login" && "Sign in to access your BFSI Vainona account"}
              {mode === "forgot" && "Enter your email and we'll send a reset link"}
              {mode === "register" && "Join 14,000+ clients on the platform"}
            </p>
          </div>
        </div>

        {/* Form body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* Google Sign In — shown for login and register, not forgot */}
          {mode !== "forgot" && (
            <>
              <button
                type="button"
                disabled={googleLoading}
                onClick={() => {
                  setGoogleLoading(true);
                  setTimeout(() => { setGoogleLoading(false); onSuccess(); onClose(); }, 1400);
                }}
                className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-border bg-white text-sm font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-60"
              >
                {googleLoading ? (
                  <span className="w-4 h-4 border-2 border-border border-t-[#4285F4] rounded-full animate-spin" />
                ) : (
                  /* Official Google "G" logo colours as inline SVG */
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                    <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                )}
                {googleLoading ? "Signing in with Google…" : "Continue with Google"}
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs text-muted-foreground">or continue with email</span>
                <div className="flex-1 border-t border-border" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:border-transparent bg-white text-foreground placeholder:text-muted-foreground"
                  style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Password — only in login / register modes */}
            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    {mode === "register" ? "Create password" : "Password"}
                  </label>
                  {mode === "login" && (
                    <button type="button" onClick={() => setMode("forgot")} className="text-xs font-medium hover:underline" style={{ color: TEAL }}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "register" ? "Min. 8 characters" : "••••••••"}
                    className="w-full pl-9 pr-10 py-2.5 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:border-transparent bg-white text-foreground placeholder:text-muted-foreground"
                    style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Register extra field */}
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Full name</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="James Okafor"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:border-transparent bg-white text-foreground placeholder:text-muted-foreground"
                    style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                  />
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: TEAL }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Signing in…" : mode === "forgot" ? "Sending link…" : "Creating account…"}
                </span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  {mode === "login" ? "Sign In" : mode === "forgot" ? "Send Reset Link" : "Create Account"}
                </>
              )}
            </button>
          </form>

          {/* Mode switcher */}
          {mode === "login" && (
            <p className="text-center text-sm text-muted-foreground">
              New to BFSI Vainona?{" "}
              <button onClick={() => setMode("register")} className="font-semibold hover:underline" style={{ color: TEAL }}>
                Create an account
              </button>
            </p>
          )}
          {mode === "register" && (
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="font-semibold hover:underline" style={{ color: TEAL }}>
                Sign in
              </button>
            </p>
          )}
          {mode === "forgot" && (
            <p className="text-center text-sm text-muted-foreground">
              <button onClick={() => setMode("login")} className="font-semibold hover:underline" style={{ color: TEAL }}>
                Back to sign in
              </button>
            </p>
          )}

          {/* Trust badges */}
          <div className="mt-8 pt-5 border-t border-border space-y-2">
            {[
              { icon: <Shield className="w-3.5 h-3.5" />, text: "256-bit SSL encryption" },
              { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "FCA regulated — No. 782341" },
              { icon: <Lock className="w-3.5 h-3.5" />, text: "GDPR compliant data handling" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span style={{ color: TEAL }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function PaymentsPage({
  cartItems,
  onBack,
  onSuccess,
}: {
  cartItems: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}) {
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
            onClick={onSuccess}
            className="w-full py-3 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: TEAL }}
          >
            Go to My Account
          </button>
          <button onClick={onBack} className="mt-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
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
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
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

export default function App() {
  const [page, setPage] = useState<"landing" | "marketplace" | "single-family" | "checkout">("landing");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Debounce search so filtering only runs 250ms after typing stops
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const handleAddToCart = useCallback((serviceId: string, tier: PricingTier) => {
    const service = SERVICES.find((s) => s.id === serviceId)!;
    setCartItems((prev) => {
      if (prev.some((c) => c.serviceId === serviceId && c.tierName === tier.name)) return prev;
      return [...prev, { serviceId, serviceName: service.name, tierName: tier.name, price: tier.price, period: tier.period }];
    });
    setCartOpen(true);
  }, []);

  const handleRemove = useCallback((index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const filteredServices = useMemo(() => {
    let list = SERVICES.filter((s) => {
      const matchCat = selectedCategory === "All" || s.category === selectedCategory;
      const matchSearch =
        debouncedSearch === "" ||
        s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        s.category.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        s.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sortBy === "Price: Low to High") list = [...list].sort((a, b) => a.tiers[0].price - b.tiers[0].price);
    else if (sortBy === "Price: High to Low") list = [...list].sort((a, b) => b.tiers[2].price - a.tiers[2].price);
    else if (sortBy === "Highest Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [selectedCategory, sortBy, debouncedSearch]);

  if (page === "landing") {
    return (
      <>
        <LandingPage
          onEnter={() => setPage("marketplace")}
          onSingleFamily={() => setPage("single-family")}
          onLogin={() => setLoginOpen(true)}
        />
        <LoginPanel isOpen={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={() => setPage("marketplace")} />
      </>
    );
  }

  if (page === "single-family") {
    return (
      <>
        <SingleFamilyBankingPage
          onHome={() => setPage("landing")}
          onSingleFamily={() => setPage("single-family")}
          onEnter={() => setPage("marketplace")}
          onLogin={() => setLoginOpen(true)}
        />
        <LoginPanel isOpen={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={() => setPage("marketplace")} />
      </>
    );
  }

  if (page === "checkout") {
    return (
      <PaymentsPage
        cartItems={cartItems}
        onBack={() => setPage("marketplace")}
        onSuccess={() => { setPage("marketplace"); setAccountOpen(true); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Secondary utility bar */}
      <div style={{ backgroundColor: NAVY }} className="text-white/70 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={() => setPage("landing")} className="hover:text-white transition-colors">Home</button>
            {["Financial Services", "Insurance", "Capital Markets"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {["About Us", "Newsroom", "Contact Us"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-white border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-4">
          <button onClick={() => setPage("landing")} className="flex items-center gap-2 mr-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: NAVY }}>
              <span className="text-white font-bold text-xs">EE</span>
            </div>
            <span className="font-bold text-base hidden sm:block" style={{ color: NAVY }}>BFSI Vainona</span>
          </button>

          <div className="flex-1 max-w-xl">
            <div className="flex rounded border border-border overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button className="bg-muted px-3 flex items-center justify-center hover:bg-border transition-colors border-l border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: NAVY }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TEAL }} />
            Live Environment
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <button onClick={() => setSelectedCategory("All")} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded hover:bg-muted">
              <LayoutGrid className="w-5 h-5" />
              <span className="text-sm hidden sm:block">Services</span>
            </button>
            <button onClick={() => setLoginOpen(true)} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded hover:bg-muted">
              <KeyRound className="w-5 h-5" />
              <span className="text-sm hidden sm:block">Login</span>
            </button>
            <button onClick={() => setAccountOpen(true)} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded hover:bg-muted">
              <UserCircle className="w-5 h-5" />
              <span className="text-sm hidden sm:block">Account</span>
            </button>
            <button onClick={() => setCartOpen(true)} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors relative px-2.5 py-1.5 rounded hover:bg-muted">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center" style={{ backgroundColor: TEAL }}>
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="text-sm hidden sm:block">Cart</span>
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category bar */}
        <div className="border-t border-border bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                    selectedCategory === cat ? "font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  style={selectedCategory === cat ? { backgroundColor: "#ddf0f4", color: TEAL } : undefined}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero banner */}
        <div className="rounded-lg bg-white border border-border p-5 mb-6 flex items-center justify-between gap-4 shadow-sm overflow-hidden relative">
          {/* Gold accent bar on left edge */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ backgroundColor: GOLD }} />
          <div className="pl-3">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Marketplace · All-in-one platform
            </p>
            <h1 className="text-xl font-bold text-foreground mb-1">Frequently Used Services</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-xs">
              {["No contracts", "Cancel anytime", "Free tier available", "24/7 support"].map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-muted-foreground">
                  <Check className="w-3.5 h-3.5" style={{ color: TEAL }} /> {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredServices.length}</span> service{filteredServices.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && <span> in <span className="font-semibold text-foreground">{selectedCategory}</span></span>}
          </p>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Sort: {sortBy}
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {showSortDropdown && (
              <>
                {/* Backdrop — closes dropdown on any outside click */}
                <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSortDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors ${sortBy === opt ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="font-semibold text-foreground mb-1">No services found</p>
            <p className="text-sm text-muted-foreground">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} onAddToCart={handleAddToCart} cartItems={cartItems} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {[
              { title: "Platform", links: ["Pricing", "Documentation", "Changelog", "Status"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
              { title: "Support", links: ["Help Center", "Community", "Contact Us", "Service SLAs"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="font-bold text-foreground mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>©2026 Everyday Banking Company | Vainona Research Company. All Rights Reserved.</span>
            <span className="hover:text-foreground cursor-pointer">Contact Us | Report a Problem?</span>
          </div>
        </div>
      </footer>

      <AccountPanel isOpen={accountOpen} onClose={() => setAccountOpen(false)} />
      <CartPanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={handleRemove}
        onQuantityChange={() => {}}
        onCheckout={() => setPage("checkout")}
      />
      <LoginPanel isOpen={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={() => {}} />
    </div>
  );
}
