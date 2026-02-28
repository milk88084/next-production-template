import { describe, it, expect } from "vitest";
import { z } from "zod";

const healthResponseSchema = z.object({
  status: z.enum(["ok", "error"]),
  timestamp: z.string(),
  uptime: z.number(),
  environment: z.string(),
});

describe("Health API Response Schema", () => {
  it("should validate a correct health response", () => {
    const mockResponse = {
      status: "ok" as const,
      timestamp: new Date().toISOString(),
      uptime: 123.456,
      environment: "test",
    };

    const result = healthResponseSchema.safeParse(mockResponse);
    expect(result.success).toBe(true);
  });

  it("should reject invalid status values", () => {
    const mockResponse = {
      status: "unknown",
      timestamp: new Date().toISOString(),
      uptime: 123.456,
      environment: "test",
    };

    const result = healthResponseSchema.safeParse(mockResponse);
    expect(result.success).toBe(false);
  });

  it("should reject missing required fields", () => {
    const mockResponse = {
      status: "ok",
    };

    const result = healthResponseSchema.safeParse(mockResponse);
    expect(result.success).toBe(false);
  });

  it("should reject invalid uptime type", () => {
    const mockResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: "not a number",
      environment: "test",
    };

    const result = healthResponseSchema.safeParse(mockResponse);
    expect(result.success).toBe(false);
  });
});
