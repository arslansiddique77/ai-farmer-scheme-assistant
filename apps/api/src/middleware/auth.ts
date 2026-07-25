import type { Request, Response, NextFunction } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../lib/config.js";
import { ApiError } from "./error.js";

export interface AuthPayload {
  id: string;
  role: "FARMER" | "ADMIN";
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export function signToken(payload: AuthPayload): string {
  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, config.jwtSecret, options);
}

/** Require a valid JWT. */
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication required");
  }
  try {
    req.user = jwt.verify(header.slice(7), config.jwtSecret) as AuthPayload;
    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
}

/** Require a specific role (role-based access control). */
export function requireRole(role: AuthPayload["role"]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new ApiError(401, "Authentication required");
    if (req.user.role !== role) throw new ApiError(403, "Insufficient permissions");
    next();
  };
}
