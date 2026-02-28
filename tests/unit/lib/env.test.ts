import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

describe("Environment Variable Validation", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("should parse valid environment variables", () => {
    const result = envSchema.safeParse({
      NODE_ENV: "production",
      NEXT_PUBLIC_APP_URL: "https://example.com",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NODE_ENV).toBe("production");
      expect(result.data.NEXT_PUBLIC_APP_URL).toBe("https://example.com");
    }
  });

  it("should apply default values when env vars are missing", () => {
    const result = envSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NODE_ENV).toBe("development");
      expect(result.data.NEXT_PUBLIC_APP_URL).toBe("http://localhost:3000");
    }
  });

  it("should reject invalid NODE_ENV values", () => {
    const result = envSchema.safeParse({
      NODE_ENV: "staging",
      NEXT_PUBLIC_APP_URL: "https://example.com",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid URLs", () => {
    const result = envSchema.safeParse({
      NODE_ENV: "development",
      NEXT_PUBLIC_APP_URL: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("should accept all valid NODE_ENV values", () => {
    for (const env of ["development", "production", "test"]) {
      const result = envSchema.safeParse({
        NODE_ENV: env,
        NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      });
      expect(result.success).toBe(true);
    }
  });
});
