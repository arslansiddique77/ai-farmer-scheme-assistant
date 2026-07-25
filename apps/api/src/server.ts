import { createApp } from "./app.js";
import { config } from "./lib/config.js";
import { logger } from "./lib/logger.js";
import { startScheduler } from "./jobs/scheduler.js";

const app = createApp();

app.listen(config.port, () => {
  logger.info(`🚜 Kisaniyat API running on http://localhost:${config.port}`);
  logger.info(`   Health: http://localhost:${config.port}/api/health`);
  startScheduler();
});
