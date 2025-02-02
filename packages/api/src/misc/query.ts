import { z } from "zod";
import { Result, Ok, Err } from "src/misc/results";
import { ValidationError } from "src/misc/http";

export function parseQuery<T extends z.ZodType>(
  query: unknown,
  schema: T,
): Result<z.infer<T>, ValidationError[]> {
  const result = schema.safeParse(query);
  if (!result.success) {
    return Err(
      result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        detail: issue.message,
      })),
    );
  }
  return Ok(result.data);
}
