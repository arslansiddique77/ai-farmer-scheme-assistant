import { Router } from "express";
import { z } from "zod";
import { prisma } from "@kisaniyat/database";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";
import { serializeScheme } from "../lib/serialize.js";

export const bookmarkRouter = Router();
bookmarkRouter.use(requireAuth);

// GET /api/bookmarks
bookmarkRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: req.user!.id },
      include: { scheme: true },
    });
    res.json(bookmarks.map((b: { scheme: Parameters<typeof serializeScheme>[0] }) => serializeScheme(b.scheme)));
  }),
);

// POST /api/bookmarks  { schemeId }
bookmarkRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { schemeId } = z.object({ schemeId: z.string() }).parse(req.body);
    const bookmark = await prisma.bookmark.upsert({
      where: { userId_schemeId: { userId: req.user!.id, schemeId } },
      update: {},
      create: { userId: req.user!.id, schemeId },
    });
    res.status(201).json(bookmark);
  }),
);

// DELETE /api/bookmarks/:schemeId
bookmarkRouter.delete(
  "/:schemeId",
  asyncHandler(async (req, res) => {
    await prisma.bookmark.deleteMany({
      where: { userId: req.user!.id, schemeId: req.params.schemeId },
    });
    res.status(204).end();
  }),
);
