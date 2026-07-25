# 🌾 Kisaniyat — AI Farmer Scheme Assistant

> **One Platform for Every Indian Farmer.**
> Discover government schemes, subsidies, agriculture news, weather alerts and
> AI guidance — all in one beautiful place.

Kisaniyat is a production-grade, full-stack web application that helps Indian
farmers easily find central & state government schemes, track the latest official
announcements, check eligibility with AI, chat with a bilingual (Hindi/English)
assistant, and stay ahead of the weather.

---

## 📁 Monorepo structure

This project is an **npm workspaces** monorepo with clearly named packages:

```
ai-farmer-scheme-assistant/
├── apps/
│   ├── web/                 # @kisaniyat/web  — React + TS + Tailwind frontend
│   └── api/                 # @kisaniyat/api  — Express + TS backend REST API
├── packages/
│   └── database/            # @kisaniyat/database — Prisma schema, client & seed
├── docker-compose.yml       # Local Postgres + API
├── render.yaml              # Render blueprint (API + managed Postgres)
├── package.json             # Workspace root (scripts orchestrate everything)
└── docs/ARCHITECTURE.md     # System design & data-flow
```

| Package | Name | Tech | Description |
| --- | --- | --- | --- |
| `apps/web` | `@kisaniyat/web` | React 19, TypeScript, Tailwind, Framer Motion, Recharts | The farmer-facing UI (landing, dashboard, schemes, AI, weather, admin). |
| `apps/api` | `@kisaniyat/api` | Node, Express, TypeScript, JWT, Zod | Secure REST API with auth, CRUD, AI, search, cron sync. |
| `packages/database` | `@kisaniyat/database` | Prisma ORM | Schema, generated client singleton, and seed data. |

---

## ✨ Features

- **Modern landing page** — hero, animated counters, features, glassmorphism, dark mode.
- **Auth** — JWT + bcrypt, role-based (Farmer / Admin), OTP-verified registration flow.
- **Scheme discovery** — searchable, filterable cards (Central/State), pagination, detail pages, bookmarks & share.
- **Current running schemes** — live/closing-soon highlighting with deadlines.
- **Latest updates** — auto-synced official announcements with NEW / URGENT / TODAY badges.
- **AI Assistant** — bilingual (EN/HI) chat, typing animation, suggested questions, voice input & text-to-speech.
- **AI Eligibility Checker** & **AI Crop / Document** helpers.
- **Live weather** module with farmer advisories and a 7-day forecast.
- **Agriculture news** feed with category filters.
- **Notifications**, **global search**, **FAQ accordion**, **contact + map**.
- **Farmer dashboard** — profile, recommendations, bookmarks, weather widget, activity.
- **Admin panel** — analytics charts, scheme CRUD, automation & cron logs.
- **Automated government-data sync** — hourly cron job that inserts *only new* records, de-duplicated, with source URL + timestamp stored.
- **Security** — Helmet, CORS, rate limiting, input validation (Zod), parameterised queries (Prisma).
- **Accessibility & performance** — responsive/mobile-first, ARIA labels, lazy-loaded routes, image lazy-loading, debounced search, loading skeletons, caching.

> **Ethical data policy:** Kisaniyat prefers official APIs, respects `robots.txt`
> and site terms, stores the **source URL + last-updated time** for every imported
> record, labels content as **"Source: Official Government Portal"**, and links
> users directly to the official application page.

---

## 🎨 Design system

| Token | Value |
| --- | --- |
| Primary Green | `#22C55E` |
| Secondary Dark Green | `#166534` |
| Accent Yellow | `#FACC15` |
| Background | White / Very light green cards (`#F0FDF4`) |
| Typography | Poppins |
| Icons | Lucide |

---

## 🚀 Quick start

### Prerequisites
- Node.js **20+**
- (Optional) Docker, for the Postgres compose setup

### 1. Install everything (from repo root)
```bash
npm install
```

### 2. Run the frontend standalone (zero backend needed)
The web app ships with a **mock data layer**, so it runs on its own:
```bash
npm run dev:web        # http://localhost:5173
```

### 3. Run the full stack (frontend + backend + database)
```bash
# a) configure env files
cp apps/api/.env.example apps/api/.env
cp packages/database/.env.example packages/database/.env

# b) generate the Prisma client, create the SQLite dev DB & seed it
npm run db:generate
npm run db:push
npm run db:seed

# c) start the API and the web app (two terminals)
npm run dev:api        # http://localhost:4000  (health: /api/health)
npm run dev:web        # http://localhost:5173
```

To make the frontend call the real backend, set in `apps/web/.env`:
```
VITE_API_URL=http://localhost:4000/api
```
(Leave it unset to keep using the built-in mock data.)

### Demo accounts (after seeding)
| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@kisaniyat.in` | `admin123` |
| Farmer | `farmer@kisaniyat.in` | `farmer123` |

> In **mock mode** (no backend), any email logs in as a farmer; an email starting
> with `admin@` logs in as admin. Registration OTP is **`1234`**.

---

## 🧰 Root npm scripts

| Script | Action |
| --- | --- |
| `npm run dev` / `dev:web` | Start the frontend |
| `npm run dev:api` | Start the backend (watch mode) |
| `npm run build` | Build web + api |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Sync schema to the database |
| `npm run db:migrate` | Create a migration (dev) |
| `npm run db:seed` | Seed sample data |
| `npm test` | Run backend API tests (Vitest + Supertest) |

---

## 🗄️ Database

Dev uses **SQLite** for zero-setup; production uses **PostgreSQL (Neon)**.

- Dev: `DATABASE_URL="file:./dev.db"` (already in `packages/database/.env.example`)
- Prod: switch the `datasource` provider in
  [`packages/database/prisma/schema.prisma`](packages/database/prisma/schema.prisma)
  from `sqlite` to `postgresql`, then set `DATABASE_URL` to your Neon connection
  string and run `npm run db:push` (or `db:migrate`).

Tables: `User`, `Scheme`, `GovUpdate`, `News`, `WeatherCache`, `Bookmark`,
`Notification`, `ChatMessage`, `AdminLog`, `AutomationLog`.

---

## 🔌 API overview

Base URL: `/api`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/health` | – | Service health check |
| POST | `/auth/register` | – | Register (returns JWT) |
| POST | `/auth/login` | – | Login (returns JWT) |
| GET | `/auth/me` | ✅ | Current user |
| PUT | `/auth/profile` | ✅ | Update farmer profile |
| GET | `/schemes` | – | List/filter/search schemes |
| GET | `/schemes/active` | – | Current running schemes |
| GET | `/schemes/:slug` | – | Scheme detail |
| GET | `/updates` | – | Latest government updates |
| GET | `/news` | – | Agriculture news |
| GET | `/weather` | – | Weather + advisory (cached) |
| POST | `/ai/chat` | – | AI assistant (EN/HI) |
| POST | `/ai/eligibility` | – | AI eligibility matcher |
| GET | `/search` | – | Global search |
| GET/POST/DELETE | `/bookmarks` | ✅ | Manage bookmarks |
| GET/POST | `/notifications` | ✅ | Notifications |
| GET | `/admin/analytics` | 👑 | Analytics |
| GET | `/admin/logs` | 👑 | Admin + automation logs |
| POST | `/admin/sync` | 👑 | Trigger data sync |
| POST/DELETE | `/admin/schemes` | 👑 | Scheme CRUD |

✅ = requires JWT · 👑 = requires ADMIN role

---

## ☁️ Deployment

- **Frontend → Vercel:** import `apps/web`, framework auto-detected (Vite).
  See [`apps/web/vercel.json`](apps/web/vercel.json). Set `VITE_API_URL` to your API URL.
- **Backend → Render:** use the one-click [`render.yaml`](render.yaml) blueprint
  (provisions the API + a managed Postgres). Remember to set the Prisma provider
  to `postgresql` and configure `CORS_ORIGIN`.
- **Database → Neon:** create a project, copy the connection string into `DATABASE_URL`.
- **Docker (local full stack):** `docker compose up --build`.

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for step-by-step instructions.

---

## 🔐 Environment variables

Each package has a `.env.example`:
- `apps/api/.env.example` — port, JWT, CORS, cron, optional AI/weather/news keys.
- `packages/database/.env.example` — `DATABASE_URL`.
- `apps/web/.env.example` — optional `VITE_API_URL`.

All external integrations (OpenAI/Gemini, weather, news) **degrade gracefully to
mock responses** when keys are absent, so the app is always fully demoable.

---

## 🧪 Testing

```bash
npm test
```
Vitest + Supertest cover routing, validation, auth guards and role-based access
on the backend. (DB-backed integration tests run against a seeded database.)

---

## 📚 Documentation

- [Architecture & data flow](docs/ARCHITECTURE.md)
- [Deployment guide](docs/DEPLOYMENT.md)

---

## 📝 License & attribution

Built as a professional internship project. Government scheme content is sourced
from official portals (PM-KISAN, PMFBY, e-NAM, myScheme, PIB, MyGov, state
agriculture departments) and always links back to the official application page.
