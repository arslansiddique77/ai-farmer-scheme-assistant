import { Router } from "express";
import { prisma } from "@kisaniyat/database";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

export const notificationRouter = Router();
notificationRouter.use(requireAuth);

// GET /api/notifications
notificationRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await prisma.notification.findMany({
      where: { OR: [{ userId: req.user!.id }, { userId: null }] },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
    res.json(items);
  }),
);

// POST /api/notifications/read-all
notificationRouter.post(
  "/read-all",
  asyncHandler(async (req, res) => {
    await prisma.notification.updateMany({
      where: { OR: [{ userId: req.user!.id }, { userId: null }] },
      data: { read: true },
    });
    res.json({ ok: true });
  }),
);
