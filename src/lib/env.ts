import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

const serverEnvSchema = envSchema.extend({
  API_SECRET: z.string().min(1).optional(),
  RATE_LIMIT_MAX: z.coerce.number().positive().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().positive().default(60000),
});

export type Env = z.infer<typeof envSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

function createEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

function createServerEnv() {
  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid server environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid server environment variables");
  }

  return parsed.data;
}

export const env = createEnv();

export const serverEnv = typeof window === "undefined" ? createServerEnv() : (undefined as never);
