import { describe, it, expect } from "vitest";
import { sanitizeText, stripHtml, isSafeText, containsSqlInjection } from "@/app/lib/sanitize";

describe("sanitize", () => {
  it("removes script tags", () => {
    const input = "Hello <script>alert('xss')</script> world";
    const result = sanitizeText(input);
    expect(result).not.toContain("<script>");
    expect(result).toContain("Hello");
    expect(result).toContain("world");
  });

  it("strips event handlers", () => {
    const input = `<img src="x" onerror="alert(1)">`;
    const result = sanitizeText(input);
    expect(result).not.toMatch(/onerror/i);
  });

  it("strips javascript: protocol", () => {
    const input = "Click javascript:alert(1) here";
    const result = sanitizeText(input);
    expect(result.toLowerCase()).not.toContain("javascript:");
  });

  it("handles null and undefined", () => {
    expect(sanitizeText(null)).toBe("");
    expect(sanitizeText(undefined)).toBe("");
  });

  it("stripHtml removes all html tags", () => {
    expect(stripHtml("<p>Hello <b>world</b></p>")).toBe("Hello world");
  });

  it("isSafeText returns true for plain text", () => {
    expect(isSafeText("Just a normal message")).toBe(true);
  });

  it("isSafeText returns false for script injection", () => {
    expect(isSafeText("<script>alert(1)</script>")).toBe(false);
  });

  it("detects SQL injection patterns", () => {
    expect(containsSqlInjection("SELECT * FROM users")).toBe(true);
    expect(containsSqlInjection("'; DROP TABLE users;--")).toBe(true);
    expect(containsSqlInjection("Hello world")).toBe(false);
  });
});
