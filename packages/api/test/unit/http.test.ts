import { test, mock, describe } from "node:test";
import assert from "node:assert";
import { Response } from "express";
import http from "src/misc/http"; // assuming the code is in the `http` file

describe("misc/http", () => {
  test("should return 200 OK with a body", () => {
    const resMock = {
      status: mock.fn((_code: number) => resMock),
      json: mock.fn((_body: any) => resMock),
    };

    const result = http.Ok(resMock as unknown as Response, { foo: "bar" });

    assert.strictEqual(result, resMock);
    assert.deepEqual(resMock.status.mock.calls.length, 1);
    assert.deepEqual(resMock.json.mock.calls.length, 1);
    assert.deepEqual(resMock.status.mock.calls[0].arguments, [200]);
    assert.deepEqual(resMock.json.mock.calls[0].arguments, [{ foo: "bar" }]);
  });

  test("should return 400 Bad Request with a detail and errors", () => {
    const resMock = {
      status: mock.fn((_code: number) => resMock),
      json: mock.fn((_body: any) => resMock),
    };

    const errors = [
      { path: "field1", detail: "This field is required" },
      { path: "field2", detail: "This field must be a number" },
    ];

    const result = http.BadRequest(
      resMock as unknown as Response,
      "Invalid data",
      errors,
    );

    assert.strictEqual(result, resMock);
    assert.deepEqual(resMock.status.mock.calls.length, 1);
    assert.deepEqual(resMock.json.mock.calls.length, 1);
    assert.deepEqual(resMock.status.mock.calls[0].arguments, [400]);
    assert.deepEqual(resMock.json.mock.calls[0].arguments, [
      {
        title: "Bad Request",
        detail: "Invalid data",
        errors,
      },
    ]);
  });

  test("should return 500 Internal Server Error", () => {
    const resMock = {
      status: mock.fn((_code: number) => resMock),
    };

    const result = http.ServerError(resMock as unknown as Response);

    assert.strictEqual(result, resMock);
    assert.deepEqual(resMock.status.mock.calls.length, 1);
    assert.deepEqual(resMock.status.mock.calls[0].arguments, [500]);
  });
});
