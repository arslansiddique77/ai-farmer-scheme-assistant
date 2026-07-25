# Kisaniyat — Architecture

## Overview

Kisaniyat is a TypeScript monorepo (npm workspaces) with three named packages:

```
@kisaniyat/web        →  React SPA (Vite)          apps/web
@kisaniyat/api        →  Express REST API          apps/api
@kisaniyat/database   →  Prisma schema + client    packages/database
```

The `@kisaniyat/api` package depends on `@kisaniyat/database`, giving it a typed,
singleton Prisma client. The web app talks to the API over REST and can also run
fully standalone via a swappable mock-data service layer.

## High-level diagram

```
┌────────────────────────┐        REST/JSON        ┌────────────────────────┐
│   @kisaniyat/web        │  ───────────────────▶   │   @kisaniyat/api        │
│  React + Vite (Vercel)  │  ◀───────────────────   │  Express (Render)       │
│                         │                         │                         │
│  services/*.ts          │                         │  routes → controllers   │
│   ├─ real API (axios)   │                         │  middleware (auth,      │
│   └─ mock fallback      │                         │   error, rate-limit)    │
└────────────────────────┘                         │  services (ai, weather) │
                                                    │  jobs (cron sync)       │
                                                    └───────────┬─────────────┘
                                                                │ Prisma
                                                                ▼
                                                    ┌────────────────────────┐
                                                    │  @kisaniyat/database    │
                                                    │  SQLite (dev) /         │
                                                    │  PostgreSQL·Neon (prod) │
                                                    └────────────────────────┘
                                                                ▲
                            External (optional):  OpenAI/Gemini · Weather API · Govt portals
```

## Frontend (`apps/web`)

- **Routing:** `react-router-dom` with **lazy-loaded** page chunks for performance.
- **State/context:** `AuthContext`, `ThemeContext` (dark mode), `LanguageContext`
  (EN/HI i18n), `AppDataContext` (bookmarks + notifications), `ToastContext`.
- **Data layer:** `src/services/*` — every call tries the real API when
  `VITE_API_URL` is set and otherwise returns bundled mock data (`src/data/*`).
  This decouples UI from the data source and keeps the app demoable offline.
- **UI:** Tailwind design tokens + reusable classes (`.btn`, `.card-surface`,
  `.badge-*`), Framer Motion animations, Recharts for admin analytics, Lucide icons.
- **Accessibility:** ARIA labels, keyboard-focusable controls, semantic markup.

## Backend (`apps/api`)

- **Layered structure:** `routes/` (HTTP) → validation (Zod) → `services/` (business
  logic) → Prisma (data). `middleware/` holds auth (JWT + RBAC) and centralized
  error handling; `jobs/` holds the cron scheduler and sync job; `lib/` holds
  config, logger and serializers.
- **Security:** Helmet headers, configurable CORS, global + auth-specific rate
  limiting, Zod input validation, bcrypt password hashing, JWT bearer auth,
  Prisma parameterised queries (SQL-injection safe).
- **AI & weather services** read API keys from env and fall back to deterministic
  mocks, so no external dependency is required to run.

## Automated government-data sync

`jobs/sync.job.ts` implements an **insert-only-new** pipeline:

1. Fetch candidate records from official sources (API/RSS — stubbed for the demo).
2. De-duplicate against the DB via a stable `externalId` unique key.
3. Insert only new records, mark them (NEW badge), store `source` + `sourceUrl` +
   timestamps, and emit a `Notification`.
4. Record an `AutomationLog` row (source, count, status).

`jobs/scheduler.ts` runs it hourly (`0 * * * *`) via `node-cron`, and admins can
trigger it on demand via `POST /api/admin/sync`. Cron is toggled by `ENABLE_CRON`.

## Database (`packages/database`)

- Prisma schema with enums and 10 models. Array-valued fields are JSON-encoded
  strings for SQLite compatibility and decoded by `lib/serialize.ts`.
- SQLite for dev (zero setup); switch the datasource `provider` to `postgresql`
  and point `DATABASE_URL` at Neon for production.
- `prisma/seed.ts` + `seed-data.ts` populate real Indian schemes, updates, news
  and two demo users.

## Request lifecycle (example: list schemes)

```
GET /api/schemes?level=Central&q=insurance
  → rate-limit → CORS → helmet
  → schemeRouter → Prisma query (parameterised)
  → serializeScheme() maps DB rows to frontend JSON
  → 200 JSON
```
