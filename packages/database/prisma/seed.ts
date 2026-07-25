/**
 * Seed script — populates the database with sample admin/farmer users, real
 * Indian government schemes, latest updates and agriculture news.
 *
 * Run with:  npm run db:seed   (from repo root)
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { seedSchemes, seedUpdates, seedNews } from "./seed-data.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Kisaniyat database...");

  // ── Users ──────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 10);
  const farmerPassword = await bcrypt.hash("farmer123", 10);

  await prisma.user.upsert({
    where: { email: "admin@kisaniyat.in" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@kisaniyat.in",
      passwordHash: adminPassword,
      role: "ADMIN",
      state: "Delhi",
    },
  });

  await prisma.user.upsert({
    where: { email: "farmer@kisaniyat.in" },
    update: {},
    create: {
      name: "Ram Kumar",
      email: "farmer@kisaniyat.in",
      passwordHash: farmerPassword,
      role: "FARMER",
      state: "Uttar Pradesh",
      district: "Varanasi",
      category: "SMALL",
      landArea: 2.5,
      cropType: "Wheat",
    },
  });

  // ── Schemes ────────────────────────────────────────────
  for (const s of seedSchemes) {
    await prisma.scheme.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // ── Updates ────────────────────────────────────────────
  for (const u of seedUpdates) {
    await prisma.govUpdate.upsert({
      where: { externalId: u.externalId },
      update: u,
      create: u,
    });
  }

  // ── News ───────────────────────────────────────────────
  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    await prisma.news.createMany({ data: seedNews });
  }

  console.log(
    `✅ Seed complete: ${seedSchemes.length} schemes, ${seedUpdates.length} updates, ${seedNews.length} news, 2 users.`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
