import { describe, it, expect } from "vitest";
import { generateLeadId, createLead, getLeadDate } from "@/app/lib/lead";

describe("lead", () => {
  it("generates a leadId with TRFSK prefix", () => {
    const id = generateLeadId();
    expect(id).toMatch(/^TRFSK-\d{8}-\d{6}$/);
  });

  it("creates a lead with required fields", () => {
    const lead = createLead({
      source: "CONTACT",
      name: "John Doe",
      email: "john@example.com",
      message: "Hello",
    });

    expect(lead.leadId).toMatch(/^TRFSK-/);
    expect(lead.source).toBe("CONTACT");
    expect(lead.status).toBe("NEW");
    expect(lead.name).toBe("John Doe");
    expect(lead.email).toBe("john@example.com");
    expect(lead.history).toHaveLength(1);
    expect(lead.notifications).toHaveLength(1);
  });

  it("returns IST-formatted date", () => {
    const date = getLeadDate();
    expect(typeof date).toBe("string");
    expect(date.length).toBeGreaterThan(0);
  });
});
