import { motion } from "framer-motion";
import { ArrowUpRight, Blocks } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import { revealItem, revealLeft, revealRight, revealUp, revealViewport } from "@/lib/motion";

const stack = [
  "JavaScript",
  "React",
  "Luau",
  "Node.js",
  "Vercel Functions",
  "Supabase",
  "PostgreSQL",
  "Row Level Security",
  "Realtime",
  "OAuth 2.0",
  "Gemini API",
];

const nodes = [
  { x: 10, y: 30, title: "WEB APP", sub: "React" },
  { x: 10, y: 190, title: "STUDIO PLUGIN", sub: "Luau" },
  { x: 170, y: 110, title: "SERVERLESS API", sub: "Vercel Functions" },
  { x: 320, y: 30, title: "GEMINI", sub: "LLM" },
  { x: 320, y: 190, title: "SUPABASE", sub: "Auth · Postgres · RLS" },
];

const edges = [
  { d: "M120,62 L170,124", label: "prompt", lx: 138, ly: 84 },
  { d: "M120,214 L170,152", label: "install", lx: 138, ly: 196 },
  { d: "M280,124 L320,62", label: "Luau", lx: 296, ly: 84 },
  { d: "M280,152 L320,214", label: "auth · quota", lx: 300, ly: 196 },
];

/** The five moving parts of Voxa and how a prompt travels between them. */
function ArchViz() {
  return (
    <svg
      viewBox="0 0 440 310"
      className="h-auto w-full min-w-[420px] text-[#0055CC] dark:text-[#00AAFF]"
      role="img"
      aria-label="Voxa architecture: web app and Studio plugin talk to a serverless API, which calls Gemini and Supabase"
    >
      {edges.map((e) => (
        <g key={e.label}>
          <path d={e.d} fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <motion.path
            d={e.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            initial={{ strokeDashoffset: 32 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
          <text
            x={e.lx}
            y={e.ly}
            textAnchor="middle"
            fill="currentColor"
            fillOpacity="0.75"
            className="font-mono"
            style={{ fontSize: 9.5, letterSpacing: "0.06em" }}
          >
            {e.label}
          </text>
        </g>
      ))}

      {/* Realtime pushes state back to the browser — the one edge that flows backwards. */}
      <motion.path
        d="M348,246 C330,300 110,300 92,246"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="6 10"
        strokeOpacity="0.7"
        initial={{ strokeDashoffset: 0 }}
        whileInView={{ strokeDashoffset: 32 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
      <text
        x={220}
        y={296}
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.75"
        className="font-mono"
        style={{ fontSize: 9.5, letterSpacing: "0.06em" }}
      >
        realtime — no polling
      </text>

      {nodes.map((n, i) => (
        <motion.g
          key={n.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          style={{ transformOrigin: `${n.x + 55}px ${n.y + 28}px` }}
        >
          <rect
            x={n.x}
            y={n.y}
            width="110"
            height="56"
            rx="8"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeOpacity="0.45"
          />
          <text
            x={n.x + 55}
            y={n.y + 25}
            textAnchor="middle"
            fill="currentColor"
            className="font-mono"
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}
          >
            {n.title}
          </text>
          <text
            x={n.x + 55}
            y={n.y + 40}
            textAnchor="middle"
            fill="currentColor"
            fillOpacity="0.6"
            className="font-mono"
            style={{ fontSize: 9 }}
          >
            {n.sub}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export function Voxa({ lang }: { lang: Lang }) {
  const t = dict[lang];

  return (
    <section id="voxa" className="relative px-6 py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-[#0066FF]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div {...revealUp} className="mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00AAFF]">// 02 — {t.voxa.label}</div>
          <h2 className="mt-2 font-display text-5xl font-extrabold md:text-7xl">{t.voxa.title}</h2>
          <p className="mt-3 max-w-2xl font-mono text-sm text-white/50">{t.voxa.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
          <motion.div {...revealLeft} className="glass rounded-2xl p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00AAFF]/40 bg-[#00AAFF]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00AAFF]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00AAFF]" />
                {t.voxa.status}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70">
                <Blocks className="h-3 w-3" />
                Roblox Studio
              </span>
            </div>

            <p key={lang + "-vdesc"} className="font-mono text-base leading-relaxed text-white/80">
              {t.voxa.desc}
            </p>

            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[#00AAFF]">{t.voxa.role}</p>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {t.voxa.highlightsLabel}
              </div>
              <ul className="mt-4 space-y-3">
                {t.voxa.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    {...revealItem(i)}
                    className="flex gap-3 font-mono text-sm leading-relaxed text-white/70"
                  >
                    <span className="mt-0.5 shrink-0 text-[#0066FF]">→</span>
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <a
              href="https://ggvoxa.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border-2 border-[#0066FF] bg-[#0066FF]/10 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#0066FF]/30 hover:shadow-[0_0_24px_rgba(0,170,255,0.4)]"
            >
              {t.voxa.visit}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div {...revealRight} className="flex flex-col gap-6">
            <div className="glass rounded-2xl p-6">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
                {t.voxa.archLabel}
              </div>
              {/* The diagram has a floor below which its labels stop being readable — scroll instead of shrinking. */}
              <div className="overflow-x-auto">
                <ArchViz />
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
                {t.voxa.stackLabel}
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={revealViewport}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-full border border-[#0066FF]/30 bg-black/40 px-3 py-1.5 font-mono text-[11px] text-white/70 transition-colors hover:border-[#00AAFF] hover:text-white"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
