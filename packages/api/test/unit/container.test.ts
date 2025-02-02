import { beforeEach, test, describe } from "node:test";
import assert from "node:assert";
import { Logger } from "src/misc/log";
import { Repository } from "src/repository";
import container from "src/misc/container";
import { DBClient } from "src/db";

describe("misc/container", () => {
  beforeEach(() => {
    container.reset();
  });

  test("should get dependencies from container", () => {
    const mockLogger = new Logger();
    const mockRepository = new Repository(mockLogger, {} as DBClient);

    container.register({
      logger: mockLogger,
      repository: mockRepository,
    });

    const { logger, repository } = container.get();

    assert.strictEqual(logger, mockLogger);
    assert.strictEqual(repository, mockRepository);
  });

  test("should throw an error if the dependencies are not registered", () => {
    try {
      container.get();
      assert.fail("Expected error to be thrown, but none was thrown.");
    } catch (error) {
      assert.ok(
        error,
        "Error should be thrown when dependencies are not registered.",
      );
    }
  });
});
