# @kisaniyat/api

The Express + TypeScript REST API for Kisaniyat.

## Stack
Node · Express · TypeScript · Prisma (`@kisaniyat/database`) · JWT · bcrypt · Zod · Helmet · node-cron

## Scripts
```bash
npm run dev     # tsx watch (http://localhost:4000)
npm run build   # tsc → dist/
npm run start   # run built server
npm test        # vitest + supertest
```

## Environment
Copy `.env.example` → `.env`. Key vars: `PORT`, `DATABASE_URL`, `JWT_SECRET`,
`CORS_ORIGIN`, `ENABLE_CRON`, and optional `OPENAI_API_KEY` / `GEMINI_API_KEY` /
`WEATHER_API_KEY` (features fall back to mocks when absent).

## Structure
```
src/
├── app.ts            # Express app (middleware + routes)
├── server.ts         # bootstrap + cron scheduler
├── routes/           # auth, scheme, content, bookmark, notification, ai, search, admin
├── middleware/       # auth (JWT+RBAC), error handling
├── services/         # ai, weather (pluggable, mock fallback)
├── jobs/             # cron scheduler + government-data sync
└── lib/              # config, logger, serialize
```

## Security
Helmet · CORS · rate limiting (global + auth) · Zod validation · bcrypt · JWT ·
Prisma parameterised queries.

See the root [README](../../README.md#-api-overview) for the full endpoint list.
