import { motion } from "framer-motion";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import { revealUpAtPageEnd } from "@/lib/motion";

export function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <footer className="relative border-t border-[#0066FF]/20 px-6 py-10">
      <motion.div
        {...revealUpAtPageEnd}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-mono text-xs text-white/50 md:flex-row"
      >
        <div className="flex items-center gap-1.5">
          <span>{t.footer.by} Luancrv Dev</span>
        </div>
        <div>© 2026 Luancrv Dev — {t.footer.rights}</div>
      </motion.div>
    </footer>
  );
}
