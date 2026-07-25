import { Router } from "express";
import { z } from "zod";
import { prisma } from "@kisaniyat/database";
import { asyncHandler } from "../middleware/error.js";
import { askAssistant } from "../services/ai.service.js";
import { serializeScheme } from "../lib/serialize.js";

export const aiRouter = Router();

// POST /api/ai/chat  { message, lang }
aiRouter.post(
  "/chat",
  asyncHandler(async (req, res) => {
    const { message, lang } = z
      .object({ message: z.string().min(1), lang: z.enum(["en", "hi"]).default("en") })
      .parse(req.body);
    const answer = await askAssistant(message, lang);
    res.json({ answer });
  }),
);

// POST /api/ai/eligibility  — rule-based scheme matcher
aiRouter.post(
  "/eligibility",
  asyncHandler(async (req, res) => {
    const input = z
      .object({
        state: z.string(),
        age: z.number(),
        income: z.number(),
        landArea: z.number(),
        category: z.enum(["Small Farmer", "Marginal Farmer", "Large Farmer"]),
        crop: z.string(),
      })
      .parse(req.body);

    type SchemeRow = Parameters<typeof serializeScheme>[0];
    const all = (await prisma.scheme.findMany({
      where: { status: { not: "CLOSED" } },
    })) as SchemeRow[];
    const matched = all.filter((s: SchemeRow) => {
      if (s.level === "STATE" && s.state && s.state !== input.state) return false;
      if (input.category === "Large Farmer" && s.slug === "up-kisan-karj-rahat")
        return false;
      return true;
    });
    res.json(matched.map((s) => serializeScheme(s)));
  }),
);
