import { Router } from "express";
import { prisma } from "@kisaniyat/database";
import { asyncHandler } from "../middleware/error.js";
import { serializeUpdate } from "../lib/serialize.js";
import { getWeather } from "../services/weather.service.js";

// Aggregates the read-only public content endpoints: updates, news, weather.
export const contentRouter = Router();

interface NewsRow {
  id: string;
  headline: string;
  summary: string;
  image: string;
  category: string;
  source: string;
  url: string;
  publishedAt: Date;
}

// GET /api/updates
contentRouter.get(
  "/updates",
  asyncHandler(async (_req, res) => {
    const updates = await prisma.govUpdate.findMany({
      orderBy: { publishedAt: "desc" },
      take: 30,
    });
    res.json(updates.map(serializeUpdate));
  }),
);

// GET /api/news?category=
contentRouter.get(
  "/news",
  asyncHandler(async (req, res) => {
    const { category } = req.query as Record<string, string>;
    const news = await prisma.news.findMany({
      where: category && category !== "All" ? { category } : undefined,
      orderBy: { publishedAt: "desc" },
      take: 30,
    });
    res.json(
      news.map((n: NewsRow) => ({
        id: n.id,
        headline: n.headline,
        summary: n.summary,
        image: n.image,
        category: n.category,
        source: n.source,
        url: n.url,
        publishedAt: n.publishedAt.toISOString(),
      })),
    );
  }),
);

// GET /api/weather?location=
contentRouter.get(
  "/weather",
  asyncHandler(async (req, res) => {
    const location = (req.query.location as string) || "Varanasi, Uttar Pradesh";
    res.json(await getWeather(location));
  }),
);
