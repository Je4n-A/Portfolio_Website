
import { useEffect, useMemo, useState } from "react";

const DATA = {
  name: "Jean Alvarez",
  role: "Data Science & Analytics",
  tagline:
    "Data scientist blending finance and ML—turning messy data into decisions with Python, SQL, and reproducible pipelines.",
  location: "Tampa, FL",
  blurb:
    "MS in Financial Analysis @ USF (’25–). Data Science Intern @ CDAO/IAE; prior Data Analyst Intern @ USSOCOM. Built Streamlit + PostgreSQL role-based app.",
  links: {
    email: "mailto:jeanma6742@gmail.com?subject=Hi%20Jean%20—%20Portfolio%20Inquiry",
    github: "https://github.com/Je4n-A",
    linkedin: "https://www.linkedin.com/in/jeanamalvarez034/",
    // kaggle: "https://www.kaggle.com/your-handle",
    resume: "https://docs.google.com/viewer?url=https://Je4n-A.github.io/Portfolio_Website/resume/Jean_Alvarez_Resume.pdf", 
  },
  skills: {
    languages: [
      "Python",
      "SQL",
      "R (basic)",
      "JavaScript",
    ],
    libraries: [
      "pandas",
      "NumPy",
      "scikit-learn",
      "statsmodels",
      "Plotly",
      "Streamlit",
    ],
    data: ["PostgreSQL", "SQLite", "Excel/PowerQuery", "ETL", "APIs"],
    platforms: ["Git/GitHub"],
    concepts: ["EDA", "ML Pipelines", "Feature Engineering", "A/B Testing", "Time Series"],
  },
  projects: [
    {
      title: "Spend-Plan Consolidation App",
      period: "2024",
      summary:
        "Streamlit app with PostgreSQL & role-based access; CRUD, audit trails, and real-time dashboards for multi-unit spend planning.",
      tags: ["Streamlit", "PostgreSQL", "Auth", "Dashboards"],
      links: { repo: "https://github.com/Je4n-A/Streamlit_code", demo: "#" },
      metrics: ["3 user roles", "<200ms queries", ">10 tables"],
    },
    {
      title: "German Credit Risk Model",
      period: "2025",
      summary:
        "Calibrated logistic regression with cost-sensitive thresholding; ROC-AUC 0.762, Brier 0.176; 49.5% expected cost reduction vs 0.5 cutoff.",
      tags: ["scikit-learn", "Calibration", "Class Imbalance"],
      links: { repo: "https://github.com/Je4n-A/German_Credit_Data_Science", demo: "#" },
      metrics: ["AUC 0.762", "ECE 0.089", "t* = 0.21"],
    },
    {
      title: "Behavioral Finance Research: Health vs Retirement",
      period: "Aug 2024 – Nov 2024",
      summary:
        "Behavioral finance study (ARDL/VAR) on substitution between healthcare spending and retirement saving; reproducible code and paper.",
      tags: ["Time Series", "Econometrics", "statsmodels"],
      links: { paper: "documents/cost_of_health_6_29_25.pdf" },
      metrics: ["ARDL", "IRF", "FEVD"],
    },
  ],
  experience: [
  {
    org: "Chief Digital & AI Office (CDAO) / USF IAE",
    role: "Data Science Intern",
    period: "Aug 2025 – Present",
    bullets: [
      "Designed an LLM-driven document classifier to auto-route reports using a clear taxonomy and success metrics.",
      "Built data and MLOps foundations (ingestion/cleaning, PII remediation, embeddings search, experiment tracking) in a secure environment.",
      "Implemented privacy-first portal analytics with event schema, server-side logging/audit trails, and usage dashboards.",
    ],
  },
  {
    org: "USSOCOM (via USF IAE)",
    role: "Data Analyst Intern",
    period: "Jan 2025 – Aug 2025",
    bullets: [
      "Developed a Streamlit-based financial analysis app using Python and PostgreSQL to automate reporting for leadership.",
      "Improved real-time reporting by integrating multiple financial systems, enhancing data accessibility and automation.",
      "Partnered with analysts and command staff to translate needs into user-friendly analytics tools.",
    ],
  },
  {
    org: "Ivette Cases & Associates",
    role: "Payroll Specialist",
    period: "Jun 2022 – Jan 2025",
    bullets: [
      "Processed recurring payrolls (weekly, semiweekly, and monthly) for multiple small-business clients with varying pay structures.",
      "Reconciled payroll expenses against internal records and bank statements to ensure accuracy and flag discrepancies.",
      "Prepared and submitted payroll tax files and generated reports on bonuses, overtime, and vacation balances in compliance with state and local regulations.",
    ],
  },
],
  education: [
  {
    school: "University of South Florida",
    program: "M.S. — Financial Analytics",
    period: "Fall 2025 — Fall 2026 (in progress)",
  },
  {
    school: "University of South Florida",
    program: "B.S. — Business Analytics & Information Systems",
    period: "May 2025",
  },
],
  certs: [
    "USF Data Analytics Program (Excel & Tableau)",
    "Google Data Analytics Certificate"
  ],
};

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or default to true
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

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-medium text-zinc-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/50">
    {children}
  </span>
);

const Section = ({ id, title, children, intro }: { id: string; title: string; children: React.ReactNode; intro?: string }) => (
  <section id={id} className="scroll-mt-20 bg-white py-16 dark:bg-zinc-950 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">{title}</h2>
      {intro && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">{intro}</p>
      )}
      <div className="mt-8 sm:mt-10">{children}</div>
    </div>
  </section>
);

export default function PortfolioPage() {
  const { isDark, setIsDark } = useDarkMode();

  const skills = useMemo(() => DATA.skills, []);

  const handleToggle = () => {
    setIsDark((v: boolean) => !v);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <Header isDark={isDark} onToggle={handleToggle} />

      <main className="relative">
        <Hero />

        <div className="border-t border-zinc-100 dark:border-zinc-900">
          <Section
            id="projects"
            title="Featured Projects"
            intro="A few recent builds and analyses. Repos are clean, documented, and reproducible."
          >
            <ProjectGrid projects={DATA.projects} />
          </Section>
        </div>

        <div className="border-t border-zinc-100 dark:border-zinc-900">
          <Section id="experience" title="Experience">
            <ExperienceList items={DATA.experience} />
          </Section>
        </div>

        <div className="border-t border-zinc-100 dark:border-zinc-900">
          <Section id="skills" title="Skills">
            <SkillBoard skills={skills} />
          </Section>
        </div>

        <div className="border-t border-zinc-100 dark:border-zinc-900">
          <Section id="education" title="Education & Certifications">
            <Education items={DATA.education} certs={DATA.certs} />
          </Section>
        </div>

        <div className="border-t border-zinc-100 dark:border-zinc-900">
          <Section id="contact" title="Contact" intro="Open to data science, analytics, and ML engineering roles.">
            <Contact links={DATA.links} />
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Header({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const nav = [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/95 backdrop-blur-md shadow-sm dark:border-zinc-800/60 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight transition-colors hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400">
          <span className="text-lg">{DATA.name.split(" ")[0]}</span>
          <span className="hidden text-zinc-400 sm:inline">/</span>
          <span className="hidden text-sm font-normal text-zinc-600 dark:text-zinc-400 sm:inline">{DATA.role}</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400"
            >
              {n.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <a
            href={DATA.links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm transition-all hover:border-zinc-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 sm:inline-flex"
          >
            GitHub
          </a>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggle();
            }}
            type="button"
            className="rounded-lg border border-zinc-200 p-2 text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:shadow dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-700"
            aria-label="Toggle theme"
          >
            {isDark ? "☾" : "☀"}
          </button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-zinc-200 p-2 text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:shadow dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-700 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-emerald-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-emerald-400"
              >
                {n.label}
              </a>
            ))}
            <a
              href={DATA.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-zinc-200 px-3 py-2 text-center text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              GitHub →
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_60rem_at_70%_-10%,rgba(99,102,241,0.15),transparent),radial-gradient(40rem_40rem_at_20%_10%,rgba(16,185,129,0.15),transparent)] dark:bg-[radial-gradient(60rem_60rem_at_70%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(40rem_40rem_at_20%_10%,rgba(16,185,129,0.25),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
            {DATA.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-emerald-600 dark:text-emerald-400 sm:text-2xl">{DATA.role}</p>
          <p className="mt-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">{DATA.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">{DATA.blurb}</p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a
              href={DATA.links.resume}
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 dark:focus:ring-white sm:px-6 sm:py-3 sm:text-base"
              target="_blank" rel="noreferrer"
            >
              View Resume
            </a>
            <a
              href={DATA.links.linkedin}
              className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition-all hover:border-zinc-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 dark:focus:ring-white sm:px-6 sm:py-3 sm:text-base"
              target="_blank" rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={DATA.links.email}
              className="inline-flex items-center justify-center rounded-xl border-2 border-transparent bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-600 sm:px-6 sm:py-3 sm:text-base"
            >
              Email me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectGrid({ projects }: { projects: typeof DATA.projects }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i: number) => (
        <article
          key={i}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-32 w-full bg-gradient-to-br from-indigo-200 via-emerald-200 to-cyan-200 transition-all duration-300 group-hover:from-indigo-300 group-hover:via-emerald-300 group-hover:to-cyan-300 dark:from-indigo-900/50 dark:via-emerald-900/40 dark:to-cyan-900/30 dark:group-hover:from-indigo-900/70 dark:group-hover:via-emerald-900/60 dark:group-hover:to-cyan-900/50" />
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 sm:text-lg">
                {p.title}
              </h3>
              <span className="shrink-0 text-xs font-medium text-zinc-500 dark:text-zinc-400">{p.period}</span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{p.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags?.map((t: string, idx: number) => (
                <Chip key={idx}>{t}</Chip>
              ))}
            </div>
            {(p.metrics?.length || p.links) && (
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {p.metrics?.slice(0, 2).map((m: string, j: number) => (
                    <span key={j} className="flex items-center gap-1">
                      <span className="text-emerald-600 dark:text-emerald-400">•</span> {m}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 text-sm font-medium">
                  {p.links?.repo && (
                    <a
                      href={p.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 underline-offset-2 transition-colors hover:text-emerald-700 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      Code
                    </a>
                  )}
                  {p.links?.demo && (
                    <a
                      href={p.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 underline-offset-2 transition-colors hover:text-emerald-700 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function ExperienceList({ items }: { items: typeof DATA.experience }) {
  return (
    <div className="space-y-6">
      {items.map((e, i: number) => (
        <div key={i} className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{e.role}</h3>
              <p className="mt-1 text-base font-medium text-emerald-600 dark:text-emerald-400">{e.org}</p>
            </div>
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{e.period}</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base">
            {e.bullets.map((b: string, j: number) => (
              <li key={j} className="flex gap-3">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SkillBoard({ skills }: { skills: typeof DATA.skills }) {
  const groups = [
    { label: "Languages", items: skills.languages },
    { label: "Libraries", items: skills.libraries },
    { label: "Data", items: skills.data },
    { label: "Platforms", items: skills.platforms },
    { label: "Concepts", items: skills.concepts },
  ];
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g, i: number) => (
        <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 sm:text-lg">{g.label}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {g.items.map((item: string, idx: number) => (
              <Chip key={idx}>{item}</Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Education({ items, certs }: { items: typeof DATA.education; certs: string[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-5">
        {items.map((ed, i: number) => (
          <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 sm:text-lg">{ed.school}</h3>
            <p className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 sm:text-base">{ed.program}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{ed.period}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 sm:text-lg">Certifications</h3>
        <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300 sm:text-base">
          {certs.map((c: string, i: number) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Contact({ links }: { links: typeof DATA.links }) {
  const socials = [
    { label: "Email", href: links.email, icon: "✉" },
    { label: "GitHub", href: links.github, icon: "⚡" },
    { label: "LinkedIn", href: links.linkedin, icon: "💼" },
    // { label: "Kaggle", href: links.kaggle, icon: "📊" },
  ];
  return (
    <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/50 sm:p-10">
      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
        Best way to reach me is email. I'm happy to talk about roles, projects, and collaborations.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {socials.map((s, i: number) => (
          <a
            key={i}
            href={s.href}
            target={s.label === "Email" ? "_self" : "_blank"}
            rel="noreferrer"
            className="group flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-emerald-700 sm:text-base"
          >
            <span className="text-lg transition-transform group-hover:scale-110">{s.icon}</span>
            <span>{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 bg-zinc-50 py-12 dark:border-zinc-800/60 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center">
          <p className="font-medium">© {new Date().getFullYear()} {DATA.name}. All rights reserved.</p>
          <p>
            Built with React & Tailwind.{" "}
            <a href="#top" className="font-medium text-emerald-600 underline-offset-2 transition-colors hover:text-emerald-700 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300">
              Back to top ↑
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

