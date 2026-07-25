import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";

// Unit/integration tests for key public API endpoints. Auth/DB-backed routes
// require a seeded database; these smoke tests cover routing, validation and
// security wiring without external dependencies.

process.env.ENABLE_CRON = "false";
const app = createApp();

describe("Kisaniyat API", () => {
  beforeAll(() => {
    // ensure app builds
    expect(app).toBeTruthy();
  });

  it("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe("kisaniyat-api");
  });

  it("returns 404 for unknown routes", async () => {
    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });

  it("rejects login with invalid payload (validation)", async () => {
    const res = await request(app).post("/api/auth/login").send({ email: "bad" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation failed");
  });

  it("blocks protected routes without a token", async () => {
    const res = await request(app).get("/api/bookmarks");
    expect(res.status).toBe(401);
  });

  it("blocks admin routes for unauthenticated users", async () => {
    const res = await request(app).get("/api/admin/analytics");
    expect(res.status).toBe(401);
  });

  it("AI chat validates the message field", async () => {
    const res = await request(app).post("/api/ai/chat").send({ message: "" });
    expect(res.status).toBe(400);
  });
});
