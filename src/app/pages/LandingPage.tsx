import { useState, useCallback, useEffect, useRef, type CSSProperties } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  Shield,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  ShoppingCart,
} from "lucide-react";
import { GOLD, NAVY, TEAL } from "../constants/brand";
import { HERO_SLIDES } from "../data/heroSlides";
import { SharedNav } from "../components/layout/SharedNav";
import { SharedFooter } from "../components/layout/SharedFooter";

export function LandingPage() {
  const navigate = useNavigate();
  const goToMarketplace = () => navigate("/marketplace");

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

      <SharedNav />

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
              onClick={goToMarketplace}
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
            } as CSSProperties}
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
            <button onClick={goToMarketplace} className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: TEAL }}>
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
            <button onClick={goToMarketplace} className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: TEAL }}>
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
            onClick={goToMarketplace}
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
