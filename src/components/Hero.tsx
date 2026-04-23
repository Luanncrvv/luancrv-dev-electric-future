import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Sparkles } from "lucide-react";
import { ParticleField } from "./ParticleField";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

export function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const sequence: (string | number)[] = [];
  t.hero.typewriter.forEach((s) => { sequence.push(s); sequence.push(2000); });

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0066FF]/40 bg-[#0066FF]/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#00AAFF]"
        >
          <Sparkles className="h-3 w-3" />
          <span>v5.0 // 2025</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          className="glitch font-display text-6xl font-extrabold leading-[0.9] tracking-tight text-glow md:text-8xl lg:text-9xl"
        >
          LUANCRV
          <br />
          <span className="bg-gradient-to-r from-[#00AAFF] via-[#0066FF] to-[#003399] bg-clip-text text-transparent">DEV</span>
        </motion.h1>

        <motion.div
          key={lang}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mx-auto mt-8 flex h-8 items-center justify-center font-mono text-lg text-white/80 md:text-xl"
        >
          <span className="mr-2 text-[#00AAFF]">&gt;</span>
          <TypeAnimation
            key={lang}
            sequence={sequence}
            speed={50}
            repeat={Infinity}
            cursor
            className="text-glow"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="mx-auto mt-6 max-w-xl font-mono text-sm text-white/50"
        >
          {t.hero.role}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          className="mt-12 flex items-center justify-center"
        >
          <a
            href="#about"
            className="pulse-glow group relative inline-flex items-center gap-3 rounded-full border-2 border-[#0066FF] bg-[#0066FF]/10 px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#0066FF]/30"
          >
            {t.hero.cta}
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-white/40"
      >
        <div className="flex flex-col items-center gap-2">
          <span>{t.hero.scroll}</span>
          <div className="h-10 w-px animate-pulse bg-gradient-to-b from-[#00AAFF] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
