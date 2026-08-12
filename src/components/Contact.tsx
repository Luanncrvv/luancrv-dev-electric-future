import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import { revealItem, revealScale, revealUp } from "@/lib/motion";

export function Contact({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const links = [
    { icon: Github, label: "GitHub", value: "Luanncrvv", href: "https://github.com/Luanncrvv" },
    { icon: Linkedin, label: "LinkedIn", value: "luancrvdev", href: "https://www.linkedin.com/in/luancrvdev/" },
    { icon: Mail, label: t.contact.email, value: "luancrvdev@gmail.com", href: "mailto:luancrvdev@gmail.com" },
  ];

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div {...revealUp} className="mb-16 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00AAFF]">// 06</div>
          <h2 className="mt-2 font-display text-5xl font-extrabold md:text-7xl">{t.contact.title}</h2>
          <p className="mt-3 font-mono text-sm text-white/50">{t.contact.subtitle}</p>
        </motion.div>

        <motion.div {...revealScale} className="glass rounded-3xl p-8 md:p-12">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2">
              <span className="pulse-dot h-2 w-2 rounded-full bg-green-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-green-300">{t.contact.available}</span>
            </div>
          </div>

          <p key={lang + "-cdesc"} className="mb-10 max-w-2xl font-mono text-base text-white/70">{t.contact.desc}</p>

          <div className="grid gap-4 md:grid-cols-3">
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                {...revealItem(i)}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-xl border border-[#0066FF]/30 bg-black/40 p-5 transition-all hover:border-[#00AAFF]"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0066FF]/20 text-[#00AAFF] transition-all group-hover:bg-[#0066FF]/40 group-hover:shadow-[0_0_16px_rgba(0,170,255,0.6)]">
                    <l.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">{l.label}</div>
                    <div className="font-mono text-sm text-white">{l.value}</div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
