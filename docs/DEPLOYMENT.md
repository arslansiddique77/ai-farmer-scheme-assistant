# Kisaniyat — Deployment Guide

Recommended production topology:

- **Frontend →** Vercel
- **Backend →** Render
- **Database →** Neon (serverless PostgreSQL)

---

## 0. Switch Prisma to PostgreSQL (production)

Edit `packages/database/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"   // was "sqlite"
  url      = env("DATABASE_URL")
}
```

Commit this change before deploying to Render/Neon.

---

## 1. Database — Neon

1. Create a project at <https://neon.tech>.
2. Copy the connection string (looks like
   `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`).
3. You'll paste it into the backend's `DATABASE_URL`.

Apply the schema locally against Neon (optional first run):

```bash
DATABASE_URL="<neon-url>" npm run db:push
DATABASE_URL="<neon-url>" npm run db:seed
```

---

## 2. Backend — Render

**Option A — Blueprint (one click):**
1. Push this repo to GitHub.
2. On Render: **New → Blueprint**, select the repo. It reads [`render.yaml`](../render.yaml)
   and provisions the `kisaniyat-api` web service + a `kisaniyat-db` Postgres.
3. Set the `CORS_ORIGIN` env var to your Vercel URL and add optional AI/weather keys.

**Option B — Manual web service:**
- Build command:
  `npm install && npm run db:generate && npm run build:api`
- Start command:
  `npm run db:push --workspace @kisaniyat/database && npm run start --workspace @kisaniyat/api`
- Health check path: `/api/health`
- Env vars: `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`,
  `ENABLE_CRON=true`, and any `OPENAI_API_KEY` / `GEMINI_API_KEY` / `WEATHER_API_KEY`.

---

## 3. Frontend — Vercel

1. On Vercel: **Add New → Project**, import the repo.
2. Set **Root Directory** to `apps/web`.
3. Framework preset: **Vite** (auto). Config in [`apps/web/vercel.json`](../apps/web/vercel.json).
4. Add env var `VITE_API_URL=https://<your-render-service>.onrender.com/api`.
5. Deploy.

---

## 4. Docker (local full stack)

```bash
docker compose up --build
# API on http://localhost:4000, Postgres on 5432
```
Remember to set the Prisma provider to `postgresql` (step 0) before building.

---

## Post-deploy checklist

- [ ] `GET /api/health` returns `{ "status": "ok" }`
- [ ] `CORS_ORIGIN` matches the deployed frontend origin
- [ ] `JWT_SECRET` is a long random value
- [ ] Database seeded (demo users + schemes) if desired
- [ ] Cron enabled (`ENABLE_CRON=true`) for hourly sync
- [ ] Frontend `VITE_API_URL` points at the backend
