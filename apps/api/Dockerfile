# ── Kisaniyat API image (multi-stage) ────────────────────────────
FROM node:20-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Copy workspace manifests for cached install
COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/package.json
COPY packages/database/package.json packages/database/package.json

RUN npm install

# Copy source
COPY packages/database packages/database
COPY apps/api apps/api

# Generate Prisma client + build TS
RUN npm run db:generate && npm run build:api

ENV NODE_ENV=production
EXPOSE 4000

# Apply schema then start (use migrate deploy in real production)
CMD ["sh", "-c", "npm run db:push --workspace @kisaniyat/database && npm run start --workspace @kisaniyat/api"]
