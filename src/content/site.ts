export const siteConfig = {
  name: "ALASHRAF-TECHUB",
  shortName: "ALASHRAF",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alashraf-techub.dev",
  title: "Ahmad Ashraf — AI Engineer & Full-Stack Developer",
  description:
    "ALASHRAF-TECHUB is the technology studio of Ahmad Ashraf, an 18-year-old AI engineer and full-stack developer building AI systems, Python backends, web products, and custom software.",
  locale: "en_US",
  keywords: [
    "Ahmad Ashraf",
    "ALASHRAF-TECHUB",
    "AI engineer",
    "Python developer",
    "full-stack developer",
    "AI automation",
    "LLM integration",
    "custom software",
    "Next.js developer",
  ],
} as const;

export const contact = {
  phone: {
    display: "+92 329 8869213",
    href: "tel:+923298869213",
  },
  email: {
    display: "ahmadashraf97800@gmail.com",
    href: "mailto:ahmadashraf97800@gmail.com",
  },
  github: {
    display: "github.com/ahmadAI900",
    href: "https://github.com/ahmadAI900",
  },
  whatsapp: [
    {
      label: "WhatsApp · UAE",
      display: "+971 56 554 7528",
      href: "https://wa.me/971565547528",
    },
    {
      label: "WhatsApp · PK",
      display: "+92 370 7347381",
      href: "https://wa.me/923707347381",
    },
  ],
} as const;

export const availability = {
  open: true,
  label: "Available for new projects",
  note: "Typically replies within a few hours.",
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "ALASHRAF-TECHUB",
  title: "MEET AHMAD",
  subtitle: "18 · CEO, ALASHRAF-TECHUB",
  tagline: "AI Engineer & Full-Stack Developer",
  description:
    "Engineering intelligence into software — AI systems, full-stack products, and automation built end-to-end.",
  primaryCta: {
    label: "Start a project",
    href: "https://wa.me/971565547528?text=Hi%20Ahmad%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  },
  secondaryCta: { label: "View work", href: "#projects" },
} as const;

export const stats = [
  { value: 18, suffix: "", label: "Years old" },
  { value: 1859, suffix: "", label: "Automated tests passing" },
  { value: 120, suffix: "", label: "Capabilities engineered" },
  { value: 5, suffix: "", label: "Service lines" },
] as const;

export const skillGroups = [
  {
    title: "AI & Automation",
    skills: [
      "Python",
      "LLM integration",
      "AI agents",
      "RAG systems",
      "Prompt engineering",
      "OpenAI API",
      "Groq",
      "Ollama",
      "OpenRouter",
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "SQLite",
      "SQLAlchemy",
      "Webhooks & integrations",
    ],
  },
  {
    title: "Automation & Testing",
    skills: [
      "Selenium",
      "Playwright",
      "PyAutoGUI",
      "Windows UI Automation",
      "pytest",
    ],
  },
  {
    title: "Frontend & Delivery",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "SvelteKit",
      "Tailwind CSS",
      "Node.js",
      "Docker",
      "Git & GitHub",
    ],
  },
] as const;

export const about = {
  heading: "Built by an engineer, not a template.",
  body: [
    "I'm Ahmad Ashraf, an 18-year-old AI engineer and the founder of ALASHRAF-TECHUB. I build software where intelligence is part of the architecture — not a feature bolted on at the end.",
    "My work spans AI agents and automation, Python backends, full-stack web platforms, and desktop tooling. I care about verified behaviour: test suites, safety checks, and systems that can explain what they did.",
    "I work directly with clients from the first conversation to delivery. No account managers, no handoffs — the person who scopes your project is the person who builds it.",
  ],
} as const;

export const experience = [
  {
    role: "Python Developer",
    company: "Arfa Kareem Technology Park (AKTP)",
    period: "1 year · paid role",
    summary:
      "Developed Python software and backend components in a professional technology environment, working across application logic, APIs, and delivery tooling.",
    highlights: [
      "Built and maintained Python application and backend code",
      "Worked with databases, APIs, and deployment workflows",
      "Collaborated in a structured training-to-production environment",
    ],
  },
] as const;

export const education = [
  {
    qualification: "Intermediate (12th)",
    institution: "KIPS College",
    result: "65%",
  },
  {
    qualification: "Matriculation (10th)",
    institution: "Allama Iqbal Public High School",
    result: "83%",
  },
  {
    qualification: "IELTS",
    institution: "English proficiency",
    result: "6.0 bands",
  },
] as const;

export const certifications = [
  {
    id: "AKTP-SLMS-2025-2387",
    name: "Software Development — SLMS",
    issuer: "Arfa Kareem Technology Park (AKTP)",
    issued: "29 Oct 2025",
    detail:
      "Four-week program covering programming fundamentals, web development, Python backend, PostgreSQL, APIs, deployment, and real-world projects.",
    image: "/certificates/aktp-software-development.png",
    imageAlt:
      "AKTP certificate of completion for Software Development awarded to Ahmad Ashraf",
    width: 1536,
    height: 1024,
  },
  {
    id: "MS-DEV-2025-1087",
    name: "Microsoft Professional Development Program",
    issuer: "Microsoft",
    issued: "29 Oct 2025",
    validUntil: "29 Oct 2027",
    detail:
      "Six-course program spanning software development, AI engineering, generative AI, AI agents, and AI applications.",
    image: "/certificates/microsoft-professional-development.png",
    imageAlt:
      "Microsoft Professional Development Program certificate awarded to Ahmad Ashraf",
    width: 1536,
    height: 1024,
  },
] as const;

export const projects = [
  {
    slug: "genesis-os",
    name: "GENESIS OS",
    kind: "Flagship · Original work",
    summary:
      "An AI-powered desktop agent for Windows that turns natural language into verified, real actions across files, browsers, documents, and applications.",
    description:
      "GENESIS OS is a three-level system: a conversational layer, specialised agents, and a compound-task router that decomposes objectives into executable workflows. It runs on local or hosted LLMs and verifies GUI actions instead of blindly simulating keystrokes.",
    highlights: [
      "120-action capability registry across browser, document, spreadsheet, GUI, file, folder, and media operations",
      "Multi-provider LLM engine: Ollama, OpenRouter, Groq, and Anthropic",
      "Windows UI Automation with content-verified typing and focus-retained verification",
      "Safety gate for destructive operations, plus long-term memory and an agent framework adapter",
      "1,859 automated tests passing with a public hardening ledger",
    ],
    stack: [
      "Python",
      "pytest",
      "OpenAI SDK",
      "Selenium",
      "Playwright",
      "PyAutoGUI",
      "PostgreSQL",
      "openpyxl",
      "python-docx",
      "pypdf",
    ],
    href: "https://github.com/ahmadAI900/GENESIS-OS",
    featured: true,
  },
  {
    slug: "tiffiny",
    name: "TIFFINY",
    kind: "Independent platform",
    summary:
      "A self-hostable AI application platform for building and running model-backed workflows, workspaces, and chat products.",
    description:
      "A Dify-style platform built independently — explicitly not affiliated with Dify. Includes magic-link authentication, workspaces, OpenAI-compatible providers, model management, chat interfaces, Docker deployment, and a health endpoint.",
    highlights: [
      "Magic-link auth and multi-workspace structure",
      "OpenAI-compatible provider and model management",
      "Docker-based self-hosting with /healthz",
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Docker", "Apache-2.0"],
    href: "https://github.com/ahmadAI900/tiffiny",
    featured: false,
  },
  {
    slug: "tornadoui",
    name: "TornadoUI",
    kind: "Derived · Open WebUI v0.6.5",
    summary:
      "An AI chat and multi-model interaction platform, extended with provider connection diagnostics and additional test coverage.",
    description:
      "Derived from Open WebUI v0.6.5 under BSD-3 with attribution retained. My work focused on diagnostics for provider connections — a /api/v1/diagnostics endpoint — and expanding automated test coverage.",
    highlights: [
      "Provider connection diagnostics endpoint",
      "Added automated test coverage",
      "Upstream Open WebUI attribution retained",
    ],
    stack: ["SvelteKit", "Vite", "Tailwind CSS", "FastAPI", "SQLAlchemy", "Socket.IO"],
    href: "https://github.com/ahmadAI900/TornadoUI",
    featured: false,
  },
  {
    slug: "infinityllm",
    name: "InfinityLLM",
    kind: "Deployment & customization · AnythingLLM",
    summary:
      "An AI workspace for intelligent document processing, retrieval-augmented generation, and agents, deployed and customised for practical use.",
    description:
      "Built on AnythingLLM (MIT) with upstream credit retained. Focused on deployment, configuration, and adapting the workspace for document-heavy RAG and agent workflows.",
    highlights: [
      "Document ingestion and RAG workflows",
      "Agent-enabled workspace configuration",
      "Deployment and customisation on AnythingLLM",
    ],
    stack: ["JavaScript", "Node.js", "AnythingLLM", "RAG", "MIT"],
    href: "https://github.com/ahmadAI900/InfinityLLM",
    featured: false,
  },
] as const;

export const services = [
  {
    slug: "ai-engineering",
    icon: "brain",
    name: "AI Engineering & Machine Learning",
    tagline: "Intelligence that ships, not demos that stall.",
    description:
      "Custom AI systems built around your actual workflow — LLM integrations, agents, RAG pipelines, and automation that produces verifiable results.",
    bullets: [
      "AI-powered applications and software",
      "Machine learning and deep-learning solutions",
      "Generative AI, LLM integrations, agents, and chatbots",
      "RAG systems, AI automation, and intelligent workflows",
      "Custom AI for businesses and individuals",
    ],
    idealFor: ["Startups", "Automation-heavy teams", "AI products"],
    cta: "Discuss an AI project",
  },
  {
    slug: "python-development",
    icon: "code",
    name: "Python Development",
    tagline: "Backends, automation, and tooling with test coverage.",
    description:
      "Production-minded Python work: APIs, automation scripts, data pipelines, and AI/ML projects that are maintainable after delivery.",
    bullets: [
      "Custom Python applications",
      "Backends and REST APIs",
      "Automation, integrations, and data processing",
      "AI/ML project development",
      "Debugging, optimization, and upgrades",
    ],
    idealFor: ["Backend teams", "Data workflows", "AI/ML projects"],
    cta: "Discuss a Python build",
  },
  {
    slug: "full-stack",
    icon: "layers",
    name: "Full-Stack Software Development",
    tagline: "One engineer, end to end.",
    description:
      "Complete product builds — responsive interfaces, APIs, databases, and integrations — delivered as a coherent system rather than disconnected parts.",
    bullets: [
      "End-to-end frontend and backend development",
      "Web applications and dashboards",
      "Modern, responsive user interfaces",
      "Database design and API integrations",
      "Custom software",
    ],
    idealFor: ["Product founders", "Internal tools", "SaaS MVPs"],
    cta: "Discuss a full-stack build",
  },
  {
    slug: "websites-saas",
    icon: "globe",
    name: "Websites & SaaS Platforms",
    tagline: "From concept to deployment.",
    description:
      "Business sites, SaaS platforms, and AI-integrated web products — designed, built, and deployed with the admin tooling you need to run them.",
    bullets: [
      "Business and professional websites",
      "SaaS platforms and web products",
      "AI-integrated websites",
      "Admin panels, dashboards, and management systems",
      "Concept through deployment",
    ],
    idealFor: ["Small businesses", "SaaS founders", "Personal brands"],
    cta: "Discuss a website or SaaS",
  },
  {
    slug: "custom-software",
    icon: "wrench",
    name: "Custom Software & Technical Solutions",
    tagline: "Software shaped to the problem.",
    description:
      "Tailor-made tools, integrations, and improvements to existing systems — including AI added to software you already run.",
    bullets: [
      "Tailor-made software",
      "AI integration into existing applications",
      "Third-party API and service integrations",
      "Maintenance, upgrades, and support",
      "Framework-flexible development",
    ],
    idealFor: ["Existing products", "Custom workflows", "Legacy upgrades"],
    cta: "Discuss custom software",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Inquire",
    description:
      "Send the form or message me on WhatsApp with what you need, your timeline, and any constraints.",
  },
  {
    step: "02",
    title: "Discuss",
    description:
      "We talk through scope, priorities, and risks on WhatsApp, a call, or email — whichever is easiest.",
  },
  {
    step: "03",
    title: "Proposal",
    description:
      "You receive a clear scope, deliverables, timeline, and quote before any work starts.",
  },
  {
    step: "04",
    title: "Payment",
    description:
      "Once the proposal is agreed, a private payment link or invoice is sent directly to you.",
  },
  {
    step: "05",
    title: "Build & deliver",
    description:
      "I build, test, and hand over the finished work with documentation and a walkthrough.",
  },
] as const;

export const faqs = [
  {
    question: "How much does a project cost?",
    answer:
      "Every project is scoped individually. After a short conversation I send a written proposal with a fixed price or milestone breakdown. You approve it before any work begins.",
  },
  {
    question: "How long does a typical build take?",
    answer:
      "Small automation or website work can be days; full products usually run several weeks. The proposal includes a realistic timeline based on scope, not an optimistic guess.",
  },
  {
    question: "How do payments work?",
    answer:
      "Nothing is charged on this site. After the proposal is agreed, I send a private payment link or invoice directly. Larger projects can be split into milestones.",
  },
  {
    question: "Can you work with my existing codebase?",
    answer:
      "Yes. I regularly work inside existing systems — adding AI features, fixing backends, integrating APIs, or improving test coverage without rewriting what already works.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. I work remotely with clients across time zones and communicate through WhatsApp, email, or scheduled calls.",
  },
  {
    question: "What happens after delivery?",
    answer:
      "You get the source code, documentation, and a walkthrough. Ongoing maintenance and support can be arranged separately if you need it.",
  },
] as const;

export const testimonials = {
  sampleNote:
    "Sample layout — these placeholders will be replaced with real client feedback as projects complete.",
  items: [
    {
      quote:
        "Placeholder testimonial. Replace this with a real client quote about scope, communication, and delivery.",
      name: "Client name",
      role: "Founder, Company",
      sample: true,
    },
    {
      quote:
        "Placeholder testimonial. Replace this with a real client quote about the technical result and support after launch.",
      name: "Client name",
      role: "Product lead, Company",
      sample: true,
    },
    {
      quote:
        "Placeholder testimonial. Replace this with a real client quote about working with a single engineer end to end.",
      name: "Client name",
      role: "Operations manager, Company",
      sample: true,
    },
  ],
} as const;

export const socialLinks = [
  { label: "GitHub", href: contact.github.href, icon: "github" },
  { label: "Email", href: contact.email.href, icon: "mail" },
  { label: "Call", href: contact.phone.href, icon: "phone" },
] as const;

export const serviceOptions = services.map((service) => ({
  value: service.slug,
  label: service.name,
}));
