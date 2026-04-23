import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Learning } from "@/components/Learning";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import type { Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Luancrv Dev — Frontend Developer & UI/UX Designer" },
      { name: "description", content: "Portfolio of Luancrv Dev — Frontend Developer & UI/UX Designer with 5+ years of experience in React, Angular, Python, and AI." },
      { property: "og:title", content: "Luancrv Dev — Frontend Developer & UI/UX Designer" },
      { property: "og:description", content: "Building the future with React, design systems, and AI." },
    ],
  }),
});

function Index() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Cursor />
      <ScrollProgress />
      <Nav lang={lang} setLang={setLang} />

      <AnimatePresence mode="wait">
        <motion.main
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Hero lang={lang} />
          <About lang={lang} />
          <Skills lang={lang} />
          <Learning lang={lang} />
          <Contact lang={lang} />
          <Footer lang={lang} />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
