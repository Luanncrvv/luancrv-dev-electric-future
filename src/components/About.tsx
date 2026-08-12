import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

const skills = [
  { name: "HTML & CSS", level: 92 },
  { name: "React", level: 90 },
  { name: "JavaScript / TypeScript", level: 88 },
  { name: "UI/UX Design", level: 85 },
  { name: "Python", level: 80 },
  { name: "SQL / Supabase", level: 75 },
  { name: "Java", level: 60 },
];

const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Python",
  "Java",
  "SQL",
  "Luau",
  "Node.js",
  "Supabase",
  "N8N",
  "Figma",
  "Git",
];

function Terminal({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [typed, setTyped] = useState("");
  const [outputIdx, setOutputIdx] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setTyped(""); setOutputIdx(0);
    const cmd = t.about.terminalCmd;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [inView, t.about.terminalCmd]);

  useEffect(() => {
    if (typed !== t.about.terminalCmd) return;
    if (outputIdx >= stack.length) return;
    const id = setTimeout(() => setOutputIdx((v) => v + 1), 150);
    return () => clearTimeout(id);
  }, [typed, outputIdx, t.about.terminalCmd]);

  return (
    <div ref={ref} className="glass overflow-hidden rounded-xl">
      <div className="flex items-center gap-2 border-b border-[#0066FF]/20 bg-black/40 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 font-mono text-xs text-white/50">~ luancrv@dev</span>
      </div>
      <div className="p-6 font-mono text-sm">
        <div className="text-white">
          <span className="text-[#00AAFF]">$</span> {typed}
          <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#00AAFF]" />
        </div>
        <div className="mt-4 space-y-1">
          {stack.slice(0, outputIdx).map((s) => (
            <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="text-white/80">
              <span className="text-[#0066FF]">→</span> {s}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function About({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00AAFF]">// 01</div>
          <h2 className="mt-2 font-display text-5xl font-extrabold md:text-7xl">{t.about.title}</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p key={lang + "-bio"} className="font-mono text-lg leading-relaxed text-white/80">
              {t.about.bio}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { v: "5+", l: t.about.years },
                { v: String(stack.length), l: t.about.stack },
                { v: "AI", l: t.about.focus },
              ].map((s) => (
                <div key={s.l} className="glass rounded-lg p-4 text-center">
                  <div className="font-display text-3xl font-bold text-[#00AAFF] text-glow">{s.v}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/60">{s.l}</div>
                </div>
              ))}
            </div>

            <div ref={ref} className="mt-10 space-y-4">
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex justify-between font-mono text-xs">
                    <span className="text-white/80">{s.name}</span>
                    <span className="text-[#00AAFF]">{s.level}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${s.level}%` } : {}}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#003399] via-[#0066FF] to-[#00AAFF]"
                      style={{ boxShadow: "0 0 12px #0066FF" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Terminal lang={lang} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
