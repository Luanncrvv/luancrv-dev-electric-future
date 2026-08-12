import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

export function Work({ lang }: { lang: Lang }) {
  const t = dict[lang];

  const projects = [
    {
      key: "osteo",
      tag: t.work.osteoTag,
      name: t.work.osteoName,
      desc: t.work.osteoDesc,
      href: "https://osteopainclinic.com/",
      host: "osteopainclinic.com",
      stack: ["WordPress", "Divi", "HTML/CSS", "jQuery", "Fresha"],
    },
    {
      key: "navira",
      tag: t.work.naviraTag,
      name: t.work.naviraName,
      desc: t.work.naviraDesc,
      href: "https://naviraa.lovable.app/",
      host: "naviraa.lovable.app",
      stack: ["React", "Vite", "Tailwind CSS"],
    },
  ];

  return (
    <section id="work" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[#00AAFF]">// 03</div>
          <h2 className="mt-2 font-display text-5xl font-extrabold md:text-7xl">{t.work.title}</h2>
          <p className="mt-3 font-mono text-sm text-white/50">{t.work.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="glass group flex flex-col rounded-2xl p-8 transition-all hover:border-[#00AAFF]/60 hover:shadow-[0_0_32px_rgba(0,170,255,0.2)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-[#0066FF]/40 bg-[#0066FF]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00AAFF]">
                  {p.tag}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[#00AAFF] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>

              <h3 className="mt-6 font-display text-3xl font-bold">{p.name}</h3>
              <div className="mt-1 font-mono text-xs text-white/40">{p.host}</div>

              <p className="mt-4 grow font-mono text-sm leading-relaxed text-white/70">{p.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[#0066FF]/30 bg-black/40 px-3 py-1 font-mono text-[10px] text-white/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
