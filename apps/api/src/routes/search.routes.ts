import { Router } from "express";
import { prisma } from "@kisaniyat/database";
import { asyncHandler } from "../middleware/error.js";

export const searchRouter = Router();

// GET /api/search?q=  — global search across schemes, updates and news
searchRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const q = (req.query.q as string)?.trim() ?? "";
    if (!q) return res.json({ schemes: [], updates: [], news: [] });

    const [schemes, updates, news] = await Promise.all([
      prisma.scheme.findMany({
        where: { OR: [{ name: { contains: q } }, { description: { contains: q } }] },
        select: { id: true, name: true, slug: true, category: true },
        take: 5,
      }),
      prisma.govUpdate.findMany({
        where: { OR: [{ title: { contains: q } }, { summary: { contains: q } }] },
        select: { id: true, title: true, officialLink: true },
        take: 5,
      }),
      prisma.news.findMany({
        where: { OR: [{ headline: { contains: q } }, { summary: { contains: q } }] },
        select: { id: true, headline: true, url: true },
        take: 5,
      }),
    ]);

    res.json({ schemes, updates, news });
  }),
);
