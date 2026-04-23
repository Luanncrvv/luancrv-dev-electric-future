import { motion } from "framer-motion";
import { Brain, Cpu } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

function NeuralViz() {
  const layers = [4, 6, 6, 3];
  const nodes: { x: number; y: number; layer: number }[] = [];
  const W = 400, H = 280;
  layers.forEach((count, li) => {
    const x = (W / (layers.length + 1)) * (li + 1);
    for (let i = 0; i < count; i++) {
      const y = (H / (count + 1)) * (i + 1);
      nodes.push({ x, y, layer: li });
    }
  });
  const edges: { from: number; to: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (nodes[j].layer === nodes[i].layer + 1) edges.push({ from: i, to: j });
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
      <defs>
        <radialGradient id="node-g">
          <stop offset="0%" stopColor="#00AAFF" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {edges.map((e, i) => (
        <motion.line
          key={i}
          x1={nodes[e.from].x} y1={nodes[e.from].y}
          x2={nodes[e.to].x} y2={nodes[e.to].y}
          stroke="#0066FF" strokeWidth="0.5" strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: i * 0.005 }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x} cy={n.y} r="14" fill="url(#node-g)"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
          <circle cx={n.x} cy={n.y} r="5" fill="#00AAFF" />
        </g>
      ))}
    </svg>
  );
}

export function Learning({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <section id="learning" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00AAFF]">// 03</div>
          <h2 className="mt-2 font-display text-5xl font-extrabold md:text-7xl">{t.learning.title}</h2>
          <p className="mt-3 font-mono text-sm text-white/50">{t.learning.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="glass relative overflow-hidden rounded-2xl p-8 min-h-[340px]">
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-[#00AAFF]/40 bg-[#00AAFF]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00AAFF]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00AAFF]" />
              {t.learning.progress}
            </div>
            <NeuralViz />
          </motion.div>

          <div className="space-y-6">
            {[
              { icon: Brain, title: t.learning.ml, desc: t.learning.mlDesc },
              { icon: Cpu, title: t.learning.ai, desc: t.learning.aiDesc },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass group rounded-xl p-6 transition-all hover:border-[#00AAFF]/60"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/20 text-[#00AAFF] transition-all group-hover:bg-[#0066FF]/40 group-hover:shadow-[0_0_20px_rgba(0,170,255,0.5)]">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{c.title}</h3>
                    <p className="mt-2 font-mono text-sm text-white/60">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
