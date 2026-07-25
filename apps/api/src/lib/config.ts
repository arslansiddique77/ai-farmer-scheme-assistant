import dotenv from "dotenv";

dotenv.config();

/** Centralised, validated runtime configuration. */
export const config = {
  env: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? "dev-insecure-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  // External integrations (optional — features degrade gracefully to mocks)
  openaiKey: process.env.OPENAI_API_KEY ?? "",
  geminiKey: process.env.GEMINI_API_KEY ?? "",
  weatherKey: process.env.WEATHER_API_KEY ?? "",
  newsKey: process.env.NEWS_API_KEY ?? "",
  enableCron: process.env.ENABLE_CRON !== "false",
};

export const isProd = config.env === "production";
