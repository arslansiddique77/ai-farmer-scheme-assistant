import cron from "node-cron";
import { config } from "../lib/config.js";
import { logger } from "../lib/logger.js";
import { runSchemeSync } from "./sync.job.js";

/**
 * Registers all scheduled cron jobs. Disabled when ENABLE_CRON=false
 * (e.g. in tests or serverless environments where crons run externally).
 */
export function startScheduler() {
  if (!config.enableCron) {
    logger.info("Cron disabled (ENABLE_CRON=false)");
    return;
  }

  // Every hour — check official portals for new schemes/updates
  cron.schedule("0 * * * *", () => {
    logger.info("Cron: hourly government-data sync starting");
    void runSchemeSync();
  });

  logger.info("Cron scheduler started (hourly sync)");
}
