import { describe, it, expect, beforeEach } from "vitest";
import { isRateLimited, getRateLimitRetryAfter } from "@/app/lib/ratelimit";

describe("ratelimit", () => {
  beforeEach(() => {
  });

  it("allows requests under the limit", () => {
    const ip = "192.168.1.1";
    expect(isRateLimited(ip)).toBe(false);
    expect(isRateLimited(ip)).toBe(false);
    expect(isRateLimited(ip)).toBe(false);
  });

  it("blocks requests over the limit", () => {
    const ip = "192.168.1.2";
    for (let i = 0; i < 5; i++) {
      isRateLimited(ip);
    }
    expect(isRateLimited(ip)).toBe(true);
  });

  it("returns positive retry-after when limited", () => {
    const ip = "192.168.1.3";
    for (let i = 0; i < 6; i++) {
      isRateLimited(ip);
    }
    expect(getRateLimitRetryAfter(ip)).toBeGreaterThan(0);
  });

  it("treats different IPs independently", () => {
    const ip1 = "10.0.0.1";
    const ip2 = "10.0.0.2";
    for (let i = 0; i < 6; i++) {
      isRateLimited(ip1);
    }
    expect(isRateLimited(ip1)).toBe(true);
    expect(isRateLimited(ip2)).toBe(false);
  });
});
