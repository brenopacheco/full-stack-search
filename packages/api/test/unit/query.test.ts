import { test, describe } from "node:test";
import assert from "node:assert";
import { parseQuery } from "src/misc/query";
import { z } from "zod";

const schema = z.object({
  foo: z.string().min(3),
});

describe("misc/query", () => {
  test("should parse valid query params", () => {
    const query = { foo: "abc" };
    const result = parseQuery(query, schema);
    assert.strictEqual(result.ok, true);
    assert.deepEqual(result.value, query);
  });

  test("should fail on invalid query params", () => {
    const query = { foo: "ab" };
    const result = parseQuery(query, schema);
    assert.strictEqual(result.ok, false);
    assert.deepEqual(result.error, [
      {
        path: "foo",
        detail: "String must contain at least 3 character(s)",
      },
    ]);
  });
});
