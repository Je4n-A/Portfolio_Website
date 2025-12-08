export const DATA = {
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
    linkedin: "https://www.linkedin.com/in/jeanmalvarez034/",
    // kaggle: "https://www.kaggle.com/your-handle",
    resume: "https://docs.google.com/viewer?url=https://Je4n-A.github.io/Portfolio_Website/documents/Jean_Alvarez_Resume-2025_pdf.pdf", 
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
      links: { paper: "https://docs.google.com/viewer?url=https://Je4n-A.github.io/Portfolio_Website/documents/cost_of_health_6_29_25.pdf" },
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
