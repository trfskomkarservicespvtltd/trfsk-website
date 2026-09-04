import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/app/lib/logger", () => ({
  Logger: {
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/app/lib/database", () => ({
  Database: {
    saveLead: vi.fn().mockResolvedValue({}),
  },
}));
  
vi.mock("@/app/lib/zoho", () => ({
  saveWebsiteLead: vi.fn().mockResolvedValue({ id: "zoho-123" }),
}));

vi.mock("@/app/lib/mail", () => ({
  sendAutoReply: vi.fn().mockResolvedValue({}),
  sendContactEmail: vi.fn().mockResolvedValue({}),
}));

import { POST } from "@/app/api/contact/route";

function makeRequest(body: unknown, ip = "127.0.0.1", origin?: string) {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-forwarded-for": ip,
    host: "localhost:3000",
  };
  if (origin) headers["origin"] = origin;

  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }) as unknown as Parameters<typeof POST>[0];
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 for invalid email", async () => {
    const req = makeRequest({
      name: "John",
      email: "not-an-email",
      message: "Hello there",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for missing required fields", async () => {
    const req = makeRequest({ name: "John" });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 403 for cross-origin requests", async () => {
    const req = makeRequest(
      {
        name: "John",
        email: "john@example.com",
        message: "Hello there",
      },
      "127.0.0.1",
      "https://malicious-site.com"
    );
    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it("returns 200 with leadId for valid submission", async () => {
    const req = makeRequest(
      {
        name: "John Doe",
        email: "john@example.com",
        message: "I would like to enquire about services.",
      },
      "203.0.113.5",
      "http://localhost:3000"
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.leadId).toMatch(/^TRFSK-/);
  });
});
