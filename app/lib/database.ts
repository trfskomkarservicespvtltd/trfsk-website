import { PrismaClient } from "@prisma/client";
import { Lead } from "@/app/lib/lead";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

class DatabaseService {

  async saveLead(lead: Lead): Promise<Lead> {
    await prisma.lead.create({
      data: {
        leadId: lead.leadId,
        source: lead.source,
        status: lead.status,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        subject: lead.subject,
        message: lead.message,
      },
    });
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return leads.map((l) => this.mapToLead(l));
  }

  async getLead(leadId: string): Promise<Lead | undefined> {
    const lead = await prisma.lead.findUnique({
      where: { leadId },
    });
    return lead ? this.mapToLead(lead) : undefined;
  }

  async count(): Promise<number> {
    return prisma.lead.count();
  }

  async getBySource(source: string): Promise<Lead[]> {
    const leads = await prisma.lead.findMany({
      where: { source },
      orderBy: { createdAt: "desc" },
    });
    return leads.map((l) => this.mapToLead(l));
  }

  async getByStatus(status: string): Promise<Lead[]> {
    const leads = await prisma.lead.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
    });
    return leads.map((l) => this.mapToLead(l));
  }

  private mapToLead(row: {
    leadId: string;
    source: string;
    status: string;
    name: string | null;
    email: string;
    phone: string | null;
    company: string | null;
    subject: string | null;
    message: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Lead {
    return {
      leadId: row.leadId,
      source: row.source as Lead["source"],
      status: row.status as Lead["status"],
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      name: row.name ?? undefined,
      email: row.email,
      phone: row.phone ?? undefined,
      company: row.company ?? undefined,
      subject: row.subject ?? undefined,
      message: row.message ?? undefined,
      history: [],
      notifications: [],
    };
  }

}

export const Database = new DatabaseService();
