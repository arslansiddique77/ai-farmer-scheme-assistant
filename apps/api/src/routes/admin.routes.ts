import { Router } from "express";
import { z } from "zod";
import { prisma } from "@kisaniyat/database";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { asyncHandler, ApiError } from "../middleware/error.js";
import { serializeScheme } from "../lib/serialize.js";
import { runSchemeSync } from "../jobs/sync.job.js";

export const adminRouter = Router();
adminRouter.use(requireAuth, requireRole("ADMIN"));

const j = (arr: string[]) => JSON.stringify(arr);

// GET /api/admin/analytics
adminRouter.get(
  "/analytics",
  asyncHandler(async (_req, res) => {
    const [schemes, users, bookmarks, notifications, byCategory, byLevel] =
      await Promise.all([
        prisma.scheme.count(),
        prisma.user.count(),
        prisma.bookmark.count(),
        prisma.notification.count(),
        prisma.scheme.groupBy({ by: ["category"], _count: true }),
        prisma.scheme.groupBy({ by: ["level"], _count: true }),
      ]);
    res.json({
      totals: { schemes, users, bookmarks, notifications },
      byCategory: byCategory.map((c: { category: string; _count: number }) => ({ name: c.category, value: c._count })),
      byLevel: byLevel.map((l: { level: string; _count: number }) => ({ name: l.level, value: l._count })),
    });
  }),
);

// GET /api/admin/logs
adminRouter.get(
  "/logs",
  asyncHandler(async (_req, res) => {
    const [admin, automation] = await Promise.all([
      prisma.adminLog.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.automationLog.findMany({ orderBy: { runAt: "desc" }, take: 50 }),
    ]);
    res.json({ admin, automation });
  }),
);

// POST /api/admin/sync — trigger the government-data sync job manually
adminRouter.post(
  "/sync",
  asyncHandler(async (req, res) => {
    const result = await runSchemeSync();
    await prisma.adminLog.create({
      data: {
        actorId: req.user!.id,
        action: "TRIGGER_SYNC",
        entity: "Scheme",
        detail: JSON.stringify(result),
      },
    });
    res.json(result);
  }),
);

const schemeInput = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  level: z.enum(["CENTRAL", "STATE"]),
  state: z.string().optional(),
  description: z.string(),
  eligibility: z.array(z.string()),
  benefits: z.array(z.string()),
  applicationProcess: z.array(z.string()),
  requiredDocuments: z.array(z.string()),
  officialLink: z.string().url(),
  status: z.enum(["ACTIVE", "CLOSING_SOON", "CLOSED", "UPCOMING"]).default("ACTIVE"),
  source: z.string(),
  sourceUrl: z.string().url(),
  tags: z.array(z.string()).default([]),
});

// POST /api/admin/schemes
adminRouter.post(
  "/schemes",
  asyncHandler(async (req, res) => {
    const d = schemeInput.parse(req.body);
    const scheme = await prisma.scheme.create({
      data: {
        ...d,
        eligibility: j(d.eligibility),
        benefits: j(d.benefits),
        applicationProcess: j(d.applicationProcess),
        requiredDocuments: j(d.requiredDocuments),
        tags: j(d.tags),
        isNew: true,
      },
    });
    res.status(201).json(serializeScheme(scheme));
  }),
);

// DELETE /api/admin/schemes/:id
adminRouter.delete(
  "/schemes/:id",
  asyncHandler(async (req, res) => {
    const existing = await prisma.scheme.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new ApiError(404, "Scheme not found");
    await prisma.scheme.delete({ where: { id: req.params.id } });
    await prisma.adminLog.create({
      data: {
        actorId: req.user!.id,
        action: "DELETE",
        entity: "Scheme",
        detail: existing.name,
      },
    });
    res.status(204).end();
  }),
);
