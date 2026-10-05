import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Shield, Landmark, Wallet } from "lucide-react";
import firstStepsTitle from "../../assets/first-steps-title.jpg";
import firstStepsBrandBody from "../../assets/first-steps-brand-body.png";
import firstStepsBrand from "../../assets/first-steps-brand.png";
import { GOLD, MIST, NAVY, TEAL } from "../constants/brand";
import { SharedNav } from "../components/layout/SharedNav";
import { SharedFooter } from "../components/layout/SharedFooter";

/** Matches first-steps-title.jpg cream so image edges disappear */
const TITLE_CREAM = "#fffbf0";
/** Cool blue band — contrasts with cream without going green */
const STEPS_BAND = "#e4ebf3";

const STEPS = [
  {
    n: "01",
    title: "Protect what matters",
    body: "Life, property, and liability cover that closes gaps before they become losses.",
    icon: Shield,
  },
  {
    n: "02",
    title: "Build on solid ground",
    body: "Everyday banking, savings, and credit structured around your family's long-term plans.",
    icon: Landmark,
  },
  {
    n: "03",
    title: "Grow with confidence",
    body: "Treasury, payments, and digital tools that scale as your household or business grows.",
    icon: Wallet,
  },
];

export function FirstStepsPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-foreground"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: TITLE_CREAM }}
    >
      <SharedNav />

      <main>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="w-full pt-2"
          style={{ backgroundColor: TITLE_CREAM }}
        >
          <div className="max-w-3xl mx-auto" style={{ backgroundColor: TITLE_CREAM }}>
            <img
              src={firstStepsTitle}
              alt="First Steps — Insurance and financial services that build your foundation"
              className="w-full h-auto block select-none"
              style={{ backgroundColor: TITLE_CREAM }}
              draggable={false}
            />
          </div>
          <div className="max-w-3xl mx-auto overflow-hidden">
            <img
              src={firstStepsBrandBody}
              alt="Finance and Insurance Service Company of Vainona"
              className="w-full h-auto block select-none"
              draggable={false}
            />
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-0 overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${firstStepsBrand})`,
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
              filter: "saturate(0.95)",
            }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: `${NAVY}99` }} />
          <div className="relative max-w-4xl mx-auto px-6 py-8 md:py-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/single-family")}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white rounded-full transition-opacity hover:opacity-90 shadow-md"
              style={{ backgroundColor: TEAL }}
            >
              Start with banking <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold uppercase tracking-widest border-2 border-white/70 text-white rounded-full transition-colors hover:bg-white hover:text-[color:var(--navy)] backdrop-blur-sm"
              style={{ ["--navy" as string]: NAVY }}
            >
              Browse services
            </button>
          </div>
        </motion.section>

        <section className="w-full" style={{ backgroundColor: STEPS_BAND }}>
          <div className="max-w-4xl mx-auto px-6 pt-8 pb-14 md:pt-10 md:pb-16">
            <div className="mx-auto mb-8 h-1 w-28 rounded-full" style={{ backgroundColor: GOLD }} />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-xs uppercase tracking-[0.28em] mb-8"
              style={{ fontFamily: "'Libre Baskerville', serif", color: NAVY }}
            >
              Your first three steps
            </motion.p>

            <div className="grid md:grid-cols-3 gap-10 md:gap-6">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.article
                    key={step.n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="text-center px-2"
                  >
                    <p
                      className="text-[10px] uppercase tracking-[0.3em] mb-3"
                      style={{ color: TEAL, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {step.n}
                    </p>
                    <div
                      className="mx-auto mb-4 w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: MIST }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.25} style={{ color: NAVY }} />
                    </div>
                    <h2
                      className="text-lg uppercase tracking-wide mb-3 font-bold"
                      style={{ fontFamily: "'Libre Baskerville', serif", color: NAVY }}
                    >
                      {step.title}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: `${NAVY}cc` }}>
                      {step.body}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-md mx-auto mb-8"
          >
            <h2
              className="text-2xl uppercase tracking-wide font-bold mb-4"
              style={{ fontFamily: "'Libre Baskerville', serif", color: NAVY }}
            >
              Begin with certainty
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Whether you are securing a first home, covering a young family, or standing up business banking —
              every lasting structure starts with a deliberate first step.
            </p>
            <button
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              style={{ color: TEAL }}
            >
              Enter the platform <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
}
