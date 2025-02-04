import { z } from "zod";

const zEnv = z.object({
  API_URL: z.string().url().default("http://localhost:3001"),
});

export const env = zEnv.parse(import.meta.env);
export type Env = z.infer<typeof zEnv>;

// HACK: for demo purposes
declare global {
  interface Window {
    DELAY_MS: number;
  }
}

window.DELAY_MS = 300;
