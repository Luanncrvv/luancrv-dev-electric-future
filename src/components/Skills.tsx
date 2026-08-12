import { motion } from "framer-motion";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

const techs = [
  { name: "React", icon: "⚛" },
  { name: "TypeScript", icon: "TS" },
  { name: "JavaScript", icon: "JS" },
  { name: "HTML/CSS", icon: "</>" },
  { name: "Python", icon: "Py" },
  { name: "Luau", icon: "Lu" },
  { name: "Java", icon: "☕" },
  { name: "SQL", icon: "DB" },
  { name: "Node.js", icon: "Nd" },
  { name: "Supabase", icon: "Sb" },
  { name: "N8N", icon: "⚙" },
  { name: "Figma", icon: "Fg" },
];

export function Skills({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00AAFF]">// 03</div>
          <h2 className="mt-2 font-display text-5xl font-extrabold md:text-7xl">{t.skills.title}</h2>
          <p className="mt-3 font-mono text-sm text-white/50">{t.skills.subtitle}</p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 md:grid-cols-3">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="group relative aspect-square"
            >
              <div className="hex absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 to-[#003399]/10 transition-all group-hover:from-[#0066FF]/40 group-hover:to-[#00AAFF]/30" />
              <div className="hex absolute inset-[2px] bg-black/80" />
              <div className="hex absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ boxShadow: "0 0 40px #0066FF, inset 0 0 40px rgba(0, 170, 255, 0.3)" }} />
              <div className="relative flex h-full flex-col items-center justify-center gap-2 p-4">
                <div className="font-display text-3xl font-bold text-[#00AAFF] transition-all group-hover:text-glow md:text-4xl">{tech.icon}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/70 md:text-xs">{tech.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
