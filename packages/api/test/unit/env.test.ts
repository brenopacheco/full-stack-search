import { test, describe } from "node:test";
import assert from "node:assert";
import { environment, EnvironmentError } from "src/misc/env";

describe("misc/env", () => {
  test("loads default environment", () => {
    process.env = {};
    const env = environment();

    assert.strictEqual(env.ok, true);
    assert.deepEqual(env.value, {
      PORT: 3001,
      LOG_FILE: null,
      LOG_LEVEL: "info",
      DATABASE_URL: null,
      NODE_ENV: "development",
      SEED: false,
    });
  });

  test("loads custom environment", () => {
    process.env = {
      PORT: "3000",
      LOG_FILE: "app.log",
      LOG_LEVEL: "debug",
      DATABASE_URL: "mongodb://localhost:27017/mydatabase",
      NODE_ENV: "development",
      SEED: "true",
    };
    const env = environment();

    assert.strictEqual(env.ok, true);
    assert.deepEqual(env.value, { ...process.env, PORT: 3000, SEED: true });
  });

  test("loads invalid environment", () => {
    process.env = {
      PORT: "foo",
      DATABASE_URL: "bar",
      NODE_ENV: "baz",
      SEED: "qux",
      LOG_LEVEL: "quux",
    };
    const env = environment();

    assert.strictEqual(env.ok, false);
    assert.deepEqual(
      env.error,
      new EnvironmentError([
        {
          var: "PORT",
          error: "Expected number, received nan",
        },
        {
          var: "NODE_ENV",
          error:
            "Invalid enum value. Expected 'development' | 'production', received 'baz'",
        },
        {
          var: "SEED",
          error:
            "Invalid enum value. Expected 'true' | 'false', received 'qux'",
        },
        {
          var: "DATABASE_URL",
          error: "Invalid connection string format",
        },
        {
          var: "LOG_LEVEL",
          error:
            "Invalid enum value. Expected 'error' | 'info' | 'debug', received 'quux'",
        },
      ]),
    );
  });
});
