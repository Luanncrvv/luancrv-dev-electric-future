import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Voxa } from "@/components/Voxa";
import { Skills } from "@/components/Skills";
import { Learning } from "@/components/Learning";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import type { Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Luancrv Dev — Front-End Developer & UI/UX Designer" },
      { name: "description", content: "Portfolio of Luan Andrade de Carvalho — front-end developer working across React, TypeScript, Python and Luau. Currently building Voxa, an AI that writes Luau and installs it inside Roblox Studio." },
      { property: "og:title", content: "Luancrv Dev — Front-End Developer & UI/UX Designer" },
      { property: "og:description", content: "Building Voxa — an AI that writes Luau and installs it straight into Roblox Studio." },
    ],
  }),
});

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : systemPrefersDark
          ? "dark"
          : "light";

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Cursor />
      <ScrollProgress />
      <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />

      {/* Keyed on lang so switching language remounts the page and re-runs the entrance
          animations. No AnimatePresence: with mode="wait" the exiting subtree never
          finished, so the new one never mounted and only the nav appeared to translate. */}
      <motion.main
        key={lang}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Hero lang={lang} />
        <About lang={lang} />
        <Voxa lang={lang} />
        <Skills lang={lang} />
        <Learning lang={lang} />
        <Contact lang={lang} />
        <Footer lang={lang} />
      </motion.main>
    </div>
  );
}
