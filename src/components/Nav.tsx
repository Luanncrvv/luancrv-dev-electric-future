import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Languages, Moon, Sun } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

export function Nav({
  lang,
  setLang,
  theme,
  setTheme,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}) {
  const t = dict[lang];
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ["hero", "about", "voxa", "work", "skills", "learning", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom >= 120) { setActive(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { id: "about", label: t.nav.about },
    { id: "voxa", label: t.nav.voxa },
    { id: "work", label: t.nav.work },
    { id: "skills", label: t.nav.skills },
    { id: "learning", label: t.nav.learning },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-[#0066FF]/20" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-display text-lg font-bold tracking-tight">
          <span className="text-[#00AAFF]">&lt;</span>luancrv<span className="text-[#00AAFF]">/&gt;</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`}
              className={`relative font-mono text-sm transition-colors ${active === it.id ? "text-[#00AAFF]" : "text-white/70 hover:text-white"}`}>
              {it.label}
              {active === it.id && (
                <motion.span layoutId="navdot" className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#00AAFF]" style={{ boxShadow: "0 0 8px #00AAFF" }} />
              )}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="group flex items-center gap-2 rounded-full border border-[#0066FF]/40 bg-black/40 px-3 py-2 font-mono text-xs uppercase tracking-widest text-white transition-all hover:border-[#00AAFF] hover:bg-[#0066FF]/10 hover:shadow-[0_0_20px_rgba(0,170,255,0.4)]"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5 text-[#00AAFF]" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-[#00AAFF]" />
            )}
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Night"}</span>
          </button>
          <button
            onClick={() => setLang(lang === "en" ? "pt" : "en")}
            className="group flex items-center gap-2 rounded-full border border-[#0066FF]/40 bg-black/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-all hover:border-[#00AAFF] hover:bg-[#0066FF]/10 hover:shadow-[0_0_20px_rgba(0,170,255,0.4)]"
          >
            <Languages className="h-3.5 w-3.5 text-[#00AAFF]" />
            {t.lang}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
