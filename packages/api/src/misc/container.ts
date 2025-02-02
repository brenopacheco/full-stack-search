import { Container } from "typedi";
import { Logger } from "src/misc/log";
import { Repository } from "src/repository";

export default {
  get: () => ({
    logger: Container.get<Logger>("log"),
    repository: Container.get<Repository>("repo"),
  }),
  register: (dependencies: { logger: Logger; repository: Repository }) => {
    Container.set("log", dependencies.logger);
    Container.set("repo", dependencies.repository);
  },
  reset: () => Container.reset(),
};
