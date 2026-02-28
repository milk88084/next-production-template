import { NextResponse } from "next/server";
import { z } from "zod";

const healthResponseSchema = z.object({
  status: z.enum(["ok", "error"]),
  timestamp: z.string(),
  uptime: z.number(),
  environment: z.string(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export async function GET() {
  const response: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? "development",
  };

  const validated = healthResponseSchema.parse(response);

  return NextResponse.json(validated, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
