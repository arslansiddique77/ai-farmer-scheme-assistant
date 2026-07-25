# @kisaniyat/database

Prisma schema, generated client (singleton) and seed data for Kisaniyat.

## Scripts
```bash
npm run generate   # prisma generate
npm run push       # prisma db push (sync schema)
npm run migrate    # prisma migrate dev
npm run seed       # populate sample data
npm run studio     # Prisma Studio GUI
```

## Environment
Copy `.env.example` → `.env`.
- Dev (SQLite): `DATABASE_URL="file:./dev.db"`
- Prod (Postgres/Neon): change the `provider` in `prisma/schema.prisma` to
  `postgresql` and set `DATABASE_URL` to your Neon connection string.

## Models
`User`, `Scheme`, `GovUpdate`, `News`, `WeatherCache`, `Bookmark`,
`Notification`, `ChatMessage`, `AdminLog`, `AutomationLog`.

Array fields (eligibility, benefits, etc.) are JSON-encoded strings for SQLite
compatibility and decoded by the API's serializer.

## Usage
```ts
import { prisma } from "@kisaniyat/database";
const schemes = await prisma.scheme.findMany();
```
The client is a lazily-instantiated singleton (safe for dev hot-reload and tests).
