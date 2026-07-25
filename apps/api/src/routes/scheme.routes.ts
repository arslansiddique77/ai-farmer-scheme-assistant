import { Router } from "express";
import { prisma } from "@kisaniyat/database";
import { asyncHandler, ApiError } from "../middleware/error.js";
import { serializeScheme } from "../lib/serialize.js";

export const schemeRouter = Router();

// GET /api/schemes?level=&category=&q=
schemeRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { level, category, q } = req.query as Record<string, string>;
    const where: Record<string, unknown> = {};
    if (level === "Central") where.level = "CENTRAL";
    if (level === "State") where.level = "STATE";
    if (category && category !== "All") where.category = category;
    if (q)
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
      ];
    const schemes = await prisma.scheme.findMany({
      where,
      orderBy: { lastUpdated: "desc" },
    });
    res.json(schemes.map(serializeScheme));
  }),
);

// GET /api/schemes/active
schemeRouter.get(
  "/active",
  asyncHandler(async (_req, res) => {
    const schemes = await prisma.scheme.findMany({
      where: { status: { in: ["ACTIVE", "CLOSING_SOON"] } },
      orderBy: { deadline: "asc" },
    });
    res.json(schemes.map(serializeScheme));
  }),
);

// GET /api/schemes/:slug
schemeRouter.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const scheme = await prisma.scheme.findUnique({
      where: { slug: req.params.slug },
    });
    if (!scheme) throw new ApiError(404, "Scheme not found");
    res.json(serializeScheme(scheme));
  }),
);
