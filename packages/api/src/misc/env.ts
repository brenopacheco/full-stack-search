import z from "zod";
import dotenv from "dotenv";
import { Err, Ok, Result } from "src/misc/results";

const zEnv = z
  .object({
    PORT: z.number({ coerce: true }).default(3001),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    SEED: z
      .enum(["true", "false"])
      .default("false")
      .transform((v) => v === "true"),
    DATABASE_URL: z
      .string()
      .regex(/^mongodb(\+srv)?:\/\//, "Invalid connection string format")
      .nullable()
      .default(null),
    LOG_LEVEL: z.enum(["error", "info", "debug"]).default("info"),
    LOG_FILE: z.string().nullable().default(null),
  })
  .refine((env) => env.DATABASE_URL || env.NODE_ENV === "development", {
    message: "Missing connection string for production environment",
    path: ["DATABASE_URL"],
  });

export type Environment = z.infer<typeof zEnv>;

class EnvironmentError extends Error {
  constructor(
    message: string,
    public errors: { var: string; error: string }[],
  ) {
    super(message);
  }
}

export const environment = (): Result<Environment, Error> => {
  dotenv.config();

  const result = zEnv.safeParse(process.env);
  if (result.success) {
    return Ok(result.data);
  }

  const errors = result.error.issues.map((issue) => ({
    var: String(issue.path),
    error: issue.message,
  }));

  return Err(new EnvironmentError("Invalid configuration", errors));
};
