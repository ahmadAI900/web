# ALASHRAF-TECHUB — Master Plan & Build Roadmap

> **Read this file first in any new session.** It is the single source of truth for
> requirements, content data, design decisions, and build progress. Update the
> **Progress Log** and check off milestones as work lands.

**Owner:** Ahmad Ashraf (18) — AI Engineer & Full-Stack Developer, CEO of ALASHRAF-TECHUB
**Project:** Personal technology brand site = portfolio (scholarships, recruiters) + services platform (clients)
**Date started:** 2026-11-10
**Target domain:** `alashraf-techub.dev` (DNS check 2026-11-10: no records — likely available; **user purchases, nothing registered without approval**)

---

## 1. Approved Decisions

- **Visual direction:** Swiss-Tech Premium, **dark aesthetic** (chosen from 3 options; mockup v1 with purple/pink gradients was rejected — the ui-ux-pro-max database flags "AI purple/pink gradients" as an anti-pattern).
- **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui.
  Animation: Framer Motion (component-level) + GSAP ScrollTrigger (choreography) + custom canvas 2D particle engine for the hero. No three.js needed.
- **Backend:** Next.js Route Handlers, Zod validation, rate limiting, Turso (libSQL, free) for inquiry storage, Resend (free) for email alerts, graceful degradation when env keys are missing.
- **AI assistant:** Groq API (`GROQ_API_KEY`), knowledge file as system prompt, streaming; voice input/output via Web Speech API (free, browser-native).
- **Payments:** NONE on-site for now. Flow = inquiry → discuss (WhatsApp/call/email) → proposal → payment link sent privately after service. Bank details + Stripe Checkout added later.
- **Execution method:** Native (I implement in-session), per user instruction "start work".
- **Design/logo:** Logo designed by me (SVG monogram + wordmark), professional, used across nav/footer/favicon/OG.

---

## 2. Brand & Identity

**Name:** ALASHRAF-TECHUB
**Positioning:** One-person technology studio. Certified AI Engineer · Python full-stack/backend developer · game-dev experience.
**Voice:** Precise, confident, engineering-first. No hype-speak, no emoji.
**Tagline (hero):** "MEET AHMAD" · "AI Engineer & Full-Stack Developer" · "CEO, ALASHRAF-TECHUB"
**Hero subline:** "Engineering intelligence into software — AI systems, full-stack products, and automation built end-to-end."

### Logo design spec
- Concept: geometric monogram **"A"** built from two angled bars + a circuit-node dot (AI + engineering), sharp Swiss geometry.
- Wordmark: `ALASHRAF` (heavy, tight) + `TECHUB` (light, letterspaced), stacked or inline.
- Variants: `primary` (accent orange on dark), `inverse` (dark on light), `mono` (single color).
- Deliverables: `src/components/brand/Logo.tsx`, `public/logo.svg`, `src/app/icon.svg` (favicon), `src/app/opengraph-image.tsx` (dynamic OG).

### Color tokens (dark)
| Token | Value | Use |
|---|---|---|
| `background` | `#0A0A0B` | page bg |
| `surface` | `#121214` | cards |
| `surface-2` | `#1A1A1D` | raised/hover |
| `border` | `#26262A` | hairlines |
| `foreground` | `#F5F5F4` | text |
| `muted-foreground` | `#A1A1AA` | secondary text |
| `accent` | `#F97316` | CTA / focus |
| `accent-hover` | `#FB923C` | hover |
| `on-accent` | `#0A0A0B` | text on orange |
| `success` | `#22C55E` | availability badge |
| `danger` | `#EF4444` | errors |

Accessibility: body text ≥ 4.5:1, focus rings visible, 44×44px touch targets, reduced-motion honored everywhere.

### Typography
- Display/headings: **Space Grotesk** (500/600/700)
- Body/UI: **DM Sans** (400/500/700)
- Mono/chips/code: **JetBrains Mono** (400/500)
- Loaded via `next/font/google`. Type scale: hero clamp(44px→120px), section h2 clamp(32px→56px), body 16-18px, line-height 1.5-1.65.

### Layout & motion
- Container `max-w-[1200px]`, 12-col grid, section padding 96-160px desktop / 64-96px mobile.
- Sharp radii (cards 16px, buttons 8px), 1px borders, minimal shadows.
- Motion: hover 200-250ms; reveals 600-900ms `cubic-bezier(0.22,1,0.36,1)`; GSAP ScrollTrigger for section choreography; particles for hero; NO layout-shifting animation.
- Icons: **Lucide only** (never emoji).
- Anti-patterns: purple/pink AI gradients, mouse-cursor-only interactions, animating width/height, unbounded canvas CPU.

---

## 3. Content Data (verified / user-provided)

### Contact (exact strings)
- Call: **+92 329 8869213** (`tel:+923298869213`)
- WhatsApp 1: **+971 565 547528** (`https://wa.me/971565547528`)
- WhatsApp 2: **+92 370 7347381** (`https://wa.me/923707347381`)
- Email: **ahmadashraf97800@gmail.com** (`mailto:`)
- GitHub: **https://github.com/ahmadAI900**

### Profile
- Age 18 · CEO & Founder, ALASHRAF-TECHUB
- Certified AI Engineer (Microsoft Professional Development Program — 6 courses)
- Python-focused full-stack/backend developer; game-development experience
- IELTS **6.0 bands**; strong communication skills

### Experience
- **Python Developer — Arfa Kareem Technology Park (AKTP)**, ~1 year, paid role (user-confirmed). Dates: to be confirmed by user before publish.
- **AKTP SLMS Training — Software Development**, 4 weeks, issued **Oct 29 2025**, Certificate ID **AKTP-SLMS-2025-2387** (modules: Programming Fundamentals, Web Dev HTML/CSS/JS, Backend Python, PostgreSQL, APIs & Deployment, Real-World Projects).

### Education (user-confirmed mapping)
- **Matric (10th): 83%** — Allama Iqbal Public High School (years: TBD/omit)
- **Intermediate (12th): 65%** — KIPS College (years: TBD/omit)

### Certifications (images in project root → copy to `public/certificates/`)
1. `file_000000005e608211b6cbdb637552a893.png` → **AKTP Certificate of Completion**, Software Development (SLMS), ID AKTP-SLMS-2025-2387, Oct 29 2025
2. `file_000000004fb48211b7c42cd86978f903.png` → **Microsoft Professional Development Program**, 6 courses (Software Development, AI Engineering, Gen AI, AI Agents, AI Applications), ID MS-DEV-2025-1087, issued Oct 29 2025, valid until Oct 29 2027, signed Satya Nadella

### Hero portrait
- `file_0000000092808211858404985d381ae6(1).png` → B&W mirror selfie → `public/brand/ahmad-mirror.png` (particle-morph target)

### Projects (honest framing required — verifiers will check)
1. **GENESIS OS** — flagship, Python. AI-powered desktop agent/OS for Windows.
   - 120-action capability registry (browser 20, document 17, spreadsheet 11, GUI 9, file 12, folder 7, media/volume 9, + others)
   - 3-level architecture: chat → agents → compound task router (LLM pipeline: objective understanding, decomposition, workflow planning)
   - Multi-provider LLM engine: Ollama (local), OpenRouter, Groq, Anthropic
   - Real Windows automation: UIA content-verified typing, Selenium/Playwright, focus-retained verification, safety gate for destructive ops
   - Document + spreadsheet intelligence; long-term memory; agent framework adapter (105/120 capabilities wired)
   - **1,859 automated tests passing**; engineering reports/hardening ledger in repo
   - Stack: Python, pytest, OpenAI SDK, Selenium, Playwright, PyAutoGUI, PostgreSQL, openpyxl/python-docx/pypdf, psutil
2. **TIFFINY** — TypeScript, Apache-2.0. Independent, self-hostable Dify-style AI application platform (explicitly not affiliated with Dify): magic-link auth, workspaces, OpenAI-compatible providers, model management, chat, Docker deploy, `/healthz` API. → frame as "independent AI application platform (Dify-style) — built & extended by me"
3. **TornadoUI** — AI chat & multi-model platform derived from **Open WebUI v0.6.5** (BSD-3, attribution retained). My additions: provider connection diagnostics endpoint `/api/v1/diagnostics`, test coverage. Stack: SvelteKit, Vite, Tailwind, FastAPI, SQLAlchemy (SQLite/Postgres), Socket.IO.
4. **InfinityLLM** — AI workspace for intelligent document processing, RAG and agents; deployment/customization based on **AnythingLLM** (MIT, credit upstream). Node/JavaScript.
5. `Genisis-AI` repo is empty — do not feature.

### Services (5 — the "Buy" section, largest visual block)
1. **AI Engineering & Machine Learning** — AI-powered apps/software; ML & deep-learning solutions; GenAI, LLM integrations, AI agents & chatbots; RAG systems, AI automation, intelligent workflows; custom AI for businesses & individuals.
2. **Python Development** — custom Python apps; backends + REST APIs; automation, integrations, data processing; AI/ML project development; debugging, optimization, upgrades.
3. **Full-Stack Software Development** — end-to-end frontend + backend; web apps & dashboards; modern responsive UI; database design & API integrations; custom software.
4. **Websites & SaaS Platforms** — business/professional websites; SaaS platforms & web products; AI-integrated sites; admin panels, dashboards, management systems; concept → deployment.
5. **Custom Software & Technical Solutions** — tailor-made software; AI integration into existing apps; third-party API/service integrations; maintenance, upgrades, support; framework-flexible development.

**Service CTA behavior:** per-service prefilled WhatsApp deep link + inquiry form with the service preselected; call/email options. Payment collected privately after proposal.

**Engagement process:** 1) Inquire → 2) Discuss (WhatsApp/call/email) → 3) Proposal & quote → 4) Payment link sent privately → 5) Build & delivery.

### Tech stack chips (marquee + skills)
Python · FastAPI · REST APIs · PostgreSQL · SQLite · Selenium · Playwright · PyAutoGUI · Windows UIA · OpenAI API · Groq · Ollama · OpenRouter · RAG · AI Agents · Prompt Engineering · TypeScript · JavaScript · React · Next.js · SvelteKit · Tailwind CSS · Node.js · Docker · Git · GitHub · pytest
(Only evidence-backed items; user may trim.)

---

## 4. Site Map & Section Requirements

Single-page app `/` with anchored sections, plus `/cv` and `/admin`.

Nav (sticky, glass): logo · About · Projects · Services · Contact · CTA "Hire Me" (WhatsApp).
Also: floating WhatsApp button (bottom-right) + floating AI assistant launcher.

1. **Hero**
   - Canvas particle "sand" intro: ~25-35k particles scatter, swirl, then converge into the mirror photo→ resolve behind text; then settle into subtle ambient drift.
   - Copy: eyebrow "ALASHRAF-TECHUB"; H1 "MEET AHMAD"; line "18 · CEO, ALASHRAF-TECHUB"; sub line; CTAs "Start a project" (WhatsApp) + "View work" (#projects).
   - Reduced-motion / low-power fallback: static portrait image + CSS fade.
   - Tech marquee under hero.
2. **Stats bar**: 18 y/o · 1,859 automated tests · 120 capabilities · 5 service lines (count-up on scroll, reduced-motion safe).
3. **About** (user's order): Technical skills first → Experience → Education → IELTS/communication → Certificates gallery (lightbox, cert IDs visible) → "Download CV" (→ `/cv`).
4. **Projects**: flagship GENESIS OS large card + 3 secondary cards; stack chips; repo links; closing GitHub showcase with live stats (GitHub API, cached) + big animated GitHub CTA. Upstream credits visible.
5. **Services & Buy** (visually dominant): intro line + 5 large cards (icon, name, description, bullet list, "ideal for" tags, WhatsApp CTA + "Request quote" form link) + engagement process strip + FAQ accordion.
6. **Testimonials**: placeholder cards, clearly marked, easy to swap (`site.ts`).
7. **Contact**: channels grid (call / WA1 / WA2 / email / GitHub) + inquiry form → API; availability badge "Available for projects".
8. **Footer**: logo, nav, contact, "© 2026 ALASHRAF-TECHUB", built-with line.
9. **`/cv`**: print-optimized CV (A4 styles), "Save as PDF" button → `window.print()`.
10. **`/admin`**: password-gated inquiry list (name, contact, service, message, date), mark-as-read optional later.
11. **AI assistant widget**: floating launcher; chat panel; streaming answers from Groq using knowledge prompt; suggested questions; mic button (Web Speech API) + spoken replies toggle; rate-limited API; text fallback + "contact Ahmad" links.

---

## 5. File Structure (target)

```
web/
├─ PLAN.md                        ← this roadmap
├─ .env.example                   ← documented env vars (no secrets)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx               ← fonts, metadata, providers
│  │  ├─ page.tsx                 ← home section composition
│  │  ├─ globals.css              ← tokens + base + utilities
│  │  ├─ cv/page.tsx              ← printable CV
│  │  ├─ admin/page.tsx           ← password-gated leads
│  │  ├─ api/inquiries/route.ts   ← POST inquiry / GET (admin)
│  │  ├─ api/assistant/route.ts   ← POST chat (Groq, streaming)
│  │  ├─ api/github/route.ts      ← cached GitHub stats
│  │  ├─ api/healthz/route.ts
│  │  ├─ icon.svg                 ← favicon
│  │  ├─ opengraph-image.tsx      ← dynamic OG
│  │  ├─ sitemap.ts, robots.ts
│  ├─ components/
│  │  ├─ brand/Logo.tsx
│  │  ├─ layout/Navbar.tsx, Footer.tsx, FloatingWhatsApp.tsx
│  │  ├─ hero/Hero.tsx, ParticlePortrait.tsx, TechMarquee.tsx
│  │  ├─ sections/Stats.tsx, About.tsx, Skills.tsx, Experience.tsx,
│  │  │  Education.tsx, Certificates.tsx, Projects.tsx, GitHubShowcase.tsx,
│  │  │  Services.tsx, Process.tsx, FAQ.tsx, Testimonials.tsx, Contact.tsx
│  │  ├─ assistant/AssistantWidget.tsx, useVoice.ts
│  │  ├─ ui/…                     ← shadcn primitives
│  │  └─ shared/SectionHeading.tsx, Reveal.tsx, Lightbox.tsx
│  ├─ content/site.ts             ← ALL content data (single source of truth)
│  ├─ content/knowledge.ts        ← AI assistant profile prompt data
│  └─ lib/{db.ts,mail.ts,rate-limit.ts,validators.ts,utils.ts,github.ts}
├─ public/
│  ├─ brand/ahmad-mirror.png
│  ├─ certificates/aktp-software-development.png
│  ├─ certificates/microsoft-professional-development.png
│  └─ …(logo.svg, og fallback)
└─ _archive/mockup-v1.html        ← old rejected spike (moved here)
```

---

## 6. Backend Specification

### POST /api/inquiries
- Zod: `{ name(2-80), email, phone?, service?(enum 5), budget?, message(10-2000), company?, website? }` — `website` is honeypot (must be empty).
- Rate limit: 5 / 10 min / IP (in-memory + optional Upstash later).
- Persist to Turso `inquiries(id INTEGER PK, name, email, phone, service, budget, message, created_at, ip_hash, user_agent)`.
- Email alert via Resend: subject `New inquiry — {name} · {service}`; HTML template with all fields + reply links.
- If `TURSO_DATABASE_URL`/`RESEND_API_KEY` missing → log server-side, still return success (dev friendly).
- Responses: 200 `{ok:true}` / 400 validation / 429 rate limited / 500.

### POST /api/assistant
- Body `{ messages: [{role, content}][≤12], }`; Zod-validated, total chars ≤ 6000.
- Groq chat completions (`llama-3.3-70b-versatile` default via `GROQ_MODEL`), streamed text.
- System prompt built from `content/knowledge.ts` + rules: answer only about Ahmad/services/projects; never invent prices/dates; route to WhatsApp/email when unsure.
- Rate limit 10 / min / IP. No key → friendly fallback message.

### GET /api/github
- Fetch user + repos from GitHub API server-side, `revalidate: 3600`; return stars, repo count, languages, top repos.

### /admin
- `?key=ADMIN_PASSWORD` query or HTTP Basic; server component checks, lists last 100 inquiries. No index (noindex meta).

### Env vars (`.env.example`)
```
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
RESEND_API_KEY=
INQUIRY_TO_EMAIL=ahmadashraf97800@gmail.com
INQUIRY_FROM_EMAIL=ALASHRAF-TECHUB <onboarding@resend.dev>
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
Free accounts needed: Turso, Resend, Groq (user signs up; keys pasted locally/Vercel env).

---

## 7. Quality Gates (from ui-ux-pro-max)

- [ ] SVG icons only (Lucide); no emoji as icons
- [ ] `cursor-pointer` on clickable, hover transitions 150-300ms
- [ ] Contrast ≥ 4.5:1 body text; visible focus rings; keyboard nav complete
- [ ] `prefers-reduced-motion` honored (canvas → static, reveals → instant)
- [ ] Responsive verified at 375 / 768 / 1024 / 1440
- [ ] Touch targets ≥ 44×44
- [ ] No horizontal scroll; CLS < 0.1 (reserve canvas/image space)
- [ ] `next/image` for photos; lazy sections below fold
- [ ] Lighthouse ≥ 90 performance/a11y/SEO on mobile (best effort; canvas hero cost noted)
- [ ] SEO: metadata, OG image, sitemap, robots, JSON-LD (Person + ProfessionalService + OfferCatalog)
- [ ] Links: all tel/wa.me/mailto correct; external links `rel="noopener"`
- [ ] Copy: no fake claims; upstream credits on forked projects; dates defensible

---

## 8. Milestones

- [ ] **M0 — Foundation:** git init, Next.js scaffold, tokens/fonts, Logo, content config, base layout. *DoD: app runs, theme + logo visible.*
- [ ] **M1 — Hero & shell:** Navbar, hero particle portrait, stats bar, marquee, footer, floating WhatsApp. *DoD: landing feels complete on mobile+desktop, reduced-motion fallback works.*
- [ ] **M2 — About & CV:** skills/experience/education/certs/lightbox, `/cv` printable. *DoD: all real data visible; print outputs clean A4.*
- [ ] **M3 — Projects & GitHub:** 4 project cards, GitHub showcase + cached API. *DoD: honest credits; graceful offline fallback.*
- [ ] **M4 — Services & Buy:** 5 dominant cards, process, FAQ. *DoD: WhatsApp links prefilled per service.*
- [ ] **M5 — Contact & backend:** form → validation → DB → email; admin. *DoD: inquiry persists + email arrives (with keys); works without keys in dev.*
- [ ] **M6 — AI assistant:** chat + streaming + voice in/out. *DoD: answers about Ahmad; rate limited; voice degrades gracefully.*
- [ ] **M7 — Polish:** testimonials placeholder, a11y/perf/SEO pass, Lighthouse, 404 page. *DoD: quality gates above checked.*
- [ ] **M8 — Deploy:** Vercel free subdomain; document `alashraf-techub.dev` steps (user buys). *DoD: production URL works, env vars set.*

---

## 9. Risks / Open Items

1. **AKTP "1-year paid role" dates** — user must confirm dates; certificate is only 4 weeks (Oct 2025). CV wording: "Python Developer — AKTP (1 year)". If dates can't be defended, reframe as "1 year combined training + development work".
2. **No education years/boards provided** — omitted; user may add via `site.ts`.
3. **Forked projects** — must keep upstream credits (AnythingLLM/Open WebUI/Dify-style independence). Never claim upstream authorship.
4. **Hero particle CPU on low-end phones** — cap particle count by device width/`navigator.hardwareConcurrency`, pause when offscreen/hidden, static fallback.
5. **Groq/Resend/Turso keys** — needed for full functionality; all flows must degrade gracefully.
6. **Payment/bank details** — explicitly later; do not add now.
7. **Testimonials** — placeholder only; must be clearly marked sample content.

---

## 10. Progress Log

| Date | Milestone | Notes |
|---|---|---|
| 2026-11-10 | M0 started | PLAN.md written; scaffold in progress |
