import { Logger } from "src/misc/log";
import { test, describe, mock, afterEach } from "node:test";
import assert from "node:assert";
import fs from "fs";
import os from "os";
import path from "path";

describe("misc/log", () => {
  const originalWrite = process.stdout.write;

  afterEach(() => {
    process.stdout.write = originalWrite;
  });

  test("should log to console", async () => {
    let output = "";
    process.stdout.write = mock.fn((msg) => {
      output += msg;
      return true;
    });

    const message = "This is a console test message";
    const logger = new Logger();
    logger.info(message);

    assert.match(output, new RegExp(`"level":"info","message":"${message}"`));
    process.stdout.write = originalWrite;
  });

  test("should log to file with LOG_FILE set", async () => {
    process.stdout.write = mock.fn(() => true);
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "log-test-"));
    const file = path.join(dir, "test.log");

    const message = "This is a console test message";
    const logger = new Logger({ LOG_FILE: file, LOG_LEVEL: "info" });
    logger.info(message);

    // Wait a bit for the log to flush
    await new Promise((resolve) => {
      const tm = setTimeout(() => {
        if (fs.existsSync(file)) {
          resolve(undefined);
          clearTimeout(tm);
        }
      }, 100);
    });

    const content = fs.readFileSync(file, "utf8");
    assert.match(content, new RegExp(`"level":"info","message":"${message}"`));
  });
});
