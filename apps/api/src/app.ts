import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./lib/config.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { authRouter } from "./routes/auth.routes.js";
import { schemeRouter } from "./routes/scheme.routes.js";
import { contentRouter } from "./routes/content.routes.js";
import { bookmarkRouter } from "./routes/bookmark.routes.js";
import { notificationRouter } from "./routes/notification.routes.js";
import { aiRouter } from "./routes/ai.routes.js";
import { searchRouter } from "./routes/search.routes.js";
import { adminRouter } from "./routes/admin.routes.js";

/** Builds and configures the Express application (kept separate for testing). */
export function createApp() {
  const app = express();

  // ── Security ──────────────────────────────────────────
  app.use(helmet());
  app.use(
    cors({
      origin: config.corsOrigin.split(","),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));

  // Global rate limiter (SQL-injection is prevented by Prisma's parameterised
  // queries; XSS by JSON responses + client escaping; CSRF is mitigated by the
  // stateless Bearer-token auth model).
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // Stricter limiter on auth endpoints
  const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30 });

  // ── Routes ────────────────────────────────────────────
  app.get("/api/health", (_req, res) =>
    res.json({ status: "ok", service: "kisaniyat-api", time: new Date().toISOString() }),
  );

  app.use("/api/auth", authLimiter, authRouter);
  app.use("/api/schemes", schemeRouter);
  app.use("/api", contentRouter); // /updates /news /weather
  app.use("/api/bookmarks", bookmarkRouter);
  app.use("/api/notifications", notificationRouter);
  app.use("/api/ai", aiRouter);
  app.use("/api/search", searchRouter);
  app.use("/api/admin", adminRouter);

  // ── Error handling ────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
