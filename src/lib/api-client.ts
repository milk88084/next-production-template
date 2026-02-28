import { z } from "zod";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

async function request<T>(
  url: string,
  schema: z.ZodType<T>,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers: customHeaders, ...rest } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const response = await fetch(url, {
    ...rest,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(
      `Request failed: ${response.status} ${response.statusText}`,
      response.status,
      errorData
    );
  }

  const data = await response.json();
  return schema.parse(data);
}

export const apiClient = {
  get: <T>(url: string, schema: z.ZodType<T>, options?: RequestOptions) =>
    request(url, schema, { ...options, method: "GET" }),

  post: <T>(url: string, schema: z.ZodType<T>, body?: unknown, options?: RequestOptions) =>
    request(url, schema, { ...options, method: "POST", body }),

  put: <T>(url: string, schema: z.ZodType<T>, body?: unknown, options?: RequestOptions) =>
    request(url, schema, { ...options, method: "PUT", body }),

  delete: <T>(url: string, schema: z.ZodType<T>, options?: RequestOptions) =>
    request(url, schema, { ...options, method: "DELETE" }),
};
