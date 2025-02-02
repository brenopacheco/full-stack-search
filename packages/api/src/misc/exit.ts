import { Logger } from "src/misc/log";

export function onShutdown(logger: Logger, callback: () => Promise<any> | any) {
  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
      logger.info(`Received ${signal}. Cleaning up...`);
      await callback();
      process.exit(0);
    });
  });

  process.on("uncaughtException", async (error) => {
    logger.error("uncaughtException", error);
    await callback();
    process.exit(1);
  });

  process.on("beforeExit", async (code) => {
    logger.info(`Event-loop loop empty`, { code });
    await callback();
  });
}
