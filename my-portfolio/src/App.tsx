
import { useEffect, useState } from "react";
import { DATA } from "./data";
import { AppleSection } from "./components/AppleSection";
import { Chatbot } from "./components/Chatbot";
import { Minesweeper } from "./components/Minesweeper";
import { cn } from "./utils/cn";
import { Github, Linkedin, Mail, FileText, ExternalLink } from "lucide-react";

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });
  
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove("dark");
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDark]);
  
  return { isDark, setIsDark };
}

export default function PortfolioPage() {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-black dark:text-zinc-100 selection:bg-emerald-500/30">
      <Header isDark={isDark} onToggle={() => setIsDark(!isDark)} />

      <main>
        <Hero />

        <AppleSection id="projects" title="Selected Work" subtitle="Crafted with precision. Built for impact." dark={isDark}>
          <ProjectGrid projects={DATA.projects} />
        </AppleSection>

        <AppleSection id="experience" title="Experience" className="bg-zinc-50 dark:bg-zinc-900/50" dark={isDark}>
          <ExperienceList items={DATA.experience} />
        </AppleSection>

        <AppleSection id="skills" title="Technical Arsenal" dark={isDark}>
          <SkillBoard skills={DATA.skills} />
        </AppleSection>

        <AppleSection id="game" title="The Royal Game" subtitle="Take a break. Wager your points. Clear the mines." className="bg-zinc-50 dark:bg-zinc-900/50" dark={isDark}>
          <Minesweeper />
        </AppleSection>

        <AppleSection id="contact" title="Get in Touch" dark={isDark}>
          <Contact links={DATA.links} />
        </AppleSection>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

function Header({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:bg-black/80 dark:border-zinc-800"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          {DATA.name}
        </a>
        
        <nav className="hidden md:flex gap-8">
          {["Projects", "Experience", "Skills", "Game", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          onClick={onToggle}
          className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          {isDark ? "☾" : "☀"}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl">
            Data Scientist.
            <br />
            <span className="text-zinc-400 dark:text-zinc-600">Problem Solver.</span>
          </h1>
          <p className="mt-8 text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl max-w-2xl mx-auto">
            {DATA.tagline}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#projects"
              className="rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              View Work
            </a>
            <a href={DATA.links.resume} target="_blank" rel="noreferrer" className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white flex items-center gap-2 hover:text-emerald-500 transition-colors">
              View Resume <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Background Gradient */}
      <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}

function ProjectGrid({ projects }: { projects: typeof DATA.projects }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <div
          key={i}
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900 transition-all hover:scale-[1.02]",
            i === 0 ? "md:col-span-2" : ""
          )}
        >
          <div className="p-8 sm:p-10 flex flex-col h-full">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{p.title}</h3>
              <div className="flex gap-2">
                {p.links?.repo && (
                  <a href={p.links.repo} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {p.links?.demo && (
                  <a href={p.links.demo} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
                {/* @ts-ignore */}
                {p.links?.paper && (
                  // @ts-ignore
                  <a href={p.links.paper} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                    <FileText className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 flex-1">{p.summary}</p>
            
            <div className="mt-8 flex flex-wrap gap-2">
              {p.tags?.map((t) => (
                <span key={t} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceList({ items }: { items: typeof DATA.experience }) {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      {items.map((e, i) => (
        <div key={i} className="relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
          <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-black" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{e.role}</h3>
            <span className="text-sm font-medium text-zinc-500">{e.period}</span>
          </div>
          <p className="mt-1 text-lg font-medium text-emerald-600 dark:text-emerald-400">{e.org}</p>
          <ul className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            {e.bullets.map((b, j) => (
              <li key={j} className="leading-relaxed">
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SkillBoard({ skills }: { skills: typeof DATA.skills }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span key={item} className="text-base font-medium text-zinc-900 dark:text-white">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Contact({ links }: { links: typeof DATA.links }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <p className="max-w-xl text-xl text-zinc-600 dark:text-zinc-400">
        Ready to collaborate? I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
      </p>
      <div className="flex gap-6">
        <a href={links.email} className="group flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-transform group-hover:scale-110 dark:bg-zinc-800 dark:text-white">
            <Mail className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium">Email</span>
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-transform group-hover:scale-110 dark:bg-zinc-800 dark:text-white">
            <Linkedin className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
        <a href={links.github} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-transform group-hover:scale-110 dark:bg-zinc-800 dark:text-white">
            <Github className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium">GitHub</span>
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        <p>&copy; {new Date().getFullYear()} {DATA.name}. All rights reserved.</p>
        <p className="mt-2">Designed with React, Tailwind, and a touch of magic.</p>
      </div>
    </footer>
  );
}

