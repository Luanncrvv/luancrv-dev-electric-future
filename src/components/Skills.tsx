import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import { revealUp, revealViewport } from "@/lib/motion";

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

/** The grid is grid-cols-3 at every breakpoint, so neighbours are stable. */
const COLS = 3;

/** Keeps the cluster alive while the pointer crosses the gap between two hexes. */
const LEAVE_DELAY = 200;

export function Skills({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [hovered, setHovered] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  // Orthogonal neighbours only — diagonals stay put, which is what gives the
  // ripple its cross shape instead of a blob.
  const neighbours = useMemo(() => {
    if (hovered === null) return [];
    const out: number[] = [];
    if (hovered % COLS !== 0) out.push(hovered - 1);
    if (hovered % COLS !== COLS - 1) out.push(hovered + 1);
    out.push(hovered - COLS, hovered + COLS);
    return out.filter((n) => n >= 0 && n < techs.length);
  }, [hovered]);

  const onEnter = (i: number) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHovered(i);
  };

  const onLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), LEAVE_DELAY);
  };

  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div {...revealUp} className="mb-16 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00AAFF]">// 04</div>
          <h2 className="mt-2 font-display text-5xl font-extrabold md:text-7xl">{t.skills.title}</h2>
          <p className="mt-3 font-mono text-sm text-white/50">{t.skills.subtitle}</p>
        </motion.div>

        <div
          onPointerLeave={onLeave}
          className="mx-auto grid max-w-4xl grid-cols-3 gap-6 md:grid-cols-3"
        >
          {techs.map((tech, i) => {
            const isBig = hovered === i;
            const isSmall = !isBig && neighbours.includes(i);

            return (
              // Outer element owns the scroll reveal, inner owns the hover cluster.
              // They have to stay separate: whileInView outranks animate in framer's
              // variant precedence, so on one element the reveal would pin the scale
              // at 1 and the hover would never move it.
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 120 }}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  onPointerEnter={() => onEnter(i)}
                  animate={
                    isBig
                      ? { scale: 1.18, y: -12, z: 24 }
                      : isSmall
                        ? { scale: 1.07, y: -5, z: 10 }
                        : { scale: 1, y: 0, z: 0 }
                  }
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group relative aspect-square"
                  style={{ zIndex: isBig ? techs.length + 1 : isSmall ? 2 : 1 }}
                >
                  <div className="hex absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 to-[#003399]/10 transition-all group-hover:from-[#0066FF]/40 group-hover:to-[#00AAFF]/30" />
                  <div className="hex absolute inset-[2px] bg-black/80" />
                  <div
                    className="hex absolute inset-0 transition-opacity"
                    style={{
                      opacity: isBig ? 1 : isSmall ? 0.45 : 0,
                      boxShadow: "0 0 40px #0066FF, inset 0 0 40px rgba(0, 170, 255, 0.3)",
                    }}
                  />
                  <div className="relative flex h-full flex-col items-center justify-center gap-2 p-4">
                    <div
                      className={`font-display text-3xl font-bold text-[#00AAFF] transition-all md:text-4xl ${isBig ? "text-glow" : ""}`}
                    >
                      {tech.icon}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/70 md:text-xs">
                      {tech.name}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
