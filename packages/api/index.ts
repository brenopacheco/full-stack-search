import { environment } from "src/misc/env";
import { Logger, defaultLogger } from "src/misc/log";
import { Repository } from "src/repository";
import container from "src/misc/container";
import app from "src/app";
import { DBClient } from "src/db";
import { onShutdown } from "src/misc/exit";

(async () => {
  const env = environment();
  if (!env.ok) {
    defaultLogger.error(env.error);
    process.exit(1);
  }

  const logger = new Logger(env.value);

  const db = env.value.DATABASE_URL
    ? await DBClient.create(logger, env.value.DATABASE_URL)
    : await DBClient.createInMemory(logger, env.value.SEED);

  if (!db.ok) {
    logger.error(db.error);
    process.exit(1);
  }

  const repository = new Repository(logger, db.value);

  container.register({ logger, repository });

  onShutdown(logger, db.value.destroy);

  const api = app();
  api.listen(env.value.PORT, () => {
    logger.info(`App started on port ${env.value.PORT}`);
  });
})();
