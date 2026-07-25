import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@kisaniyat/database";
import { signToken, requireAuth } from "../middleware/auth.js";
import { asyncHandler, ApiError } from "../middleware/error.js";

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  state: z.string().optional(),
  district: z.string().optional(),
  occupation: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function publicUser(u: {
  id: string;
  name: string;
  email: string;
  role: string;
  state: string | null;
  district: string | null;
  category: string | null;
}) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role.toLowerCase(),
    state: u.state ?? undefined,
    district: u.district ?? undefined,
    category: u.category ?? undefined,
  };
}

authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const data = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ApiError(409, "Email already registered");

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        phone: data.phone,
        state: data.state,
        district: data.district,
        occupation: data.occupation,
      },
    });
    const token = signToken({ id: user.id, role: user.role, email: user.email });
    res.status(201).json({ user: publicUser(user), token });
  }),
);

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError(401, "Invalid credentials");
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new ApiError(401, "Invalid credentials");
    const token = signToken({ id: user.id, role: user.role, email: user.email });
    res.json({ user: publicUser(user), token });
  }),
);

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) throw new ApiError(404, "User not found");
    res.json({ user: publicUser(user) });
  }),
);

authRouter.put(
  "/profile",
  requireAuth,
  asyncHandler(async (req, res) => {
    const patch = z
      .object({
        name: z.string().optional(),
        age: z.number().optional(),
        state: z.string().optional(),
        district: z.string().optional(),
        landArea: z.number().optional(),
        cropType: z.string().optional(),
        incomeCategory: z.string().optional(),
        category: z.enum(["SMALL", "MARGINAL", "LARGE"]).optional(),
      })
      .parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: patch,
    });
    res.json({ user: publicUser(user) });
  }),
);
