import { test, describe, before, after } from "node:test";
import request from "supertest";
import assert from "node:assert";
import container from "src/misc/container";
import { Logger } from "src/misc/log";
import { Repository } from "src/repository";
import { DBClient } from "src/db";
import app from "src/app";

/*
 * Example of component test
 * - app dependencies are injected
 * - flow tests transport -> services/use-case -> db adapter
 * - uses the in-memory database (alternatively, could have been mocked)
 */
describe("app", () => {
  let db: DBClient;

  before(async () => {
    const logger = new Logger();
    const dbclient = await DBClient.createInMemory(logger, true);
    if (!dbclient.ok) throw dbclient.error;
    const repository = new Repository(logger, dbclient.value);
    container.register({ logger, repository });
    db = dbclient.value;
  });

  after(async () => {
    await db.destroy();
  });

  test("GET find locations matching search", async () => {
    const response = await request(app())
      .get(`/locations?search=hong`)
      .expect("Content-Type", /json/);

    // Assert the response status is 200
    assert.strictEqual(response.status, 200);

    // Assert the cities array exists and has the correct structure
    assert(Array.isArray(response.body.cities));
    assert.strictEqual(response.body.cities[0].name, "Hong Kong");

    // Assert the hotels array exists and has the correct structure
    assert(Array.isArray(response.body.hotels));
    assert.strictEqual(
      response.body.hotels[0].hotel_name,
      "Kew Green Hotel Wanchai Hong Kong",
    );
    assert.strictEqual(response.body.hotels[1].hotel_name, "Imperial Hotel");

    // Assert the countries array exists and has the correct structure
    assert(Array.isArray(response.body.countries));
    assert.strictEqual(response.body.countries[0].country, "Hong Kong");
  });
});
