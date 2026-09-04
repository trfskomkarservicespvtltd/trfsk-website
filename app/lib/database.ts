import { Lead } from "@/app/lib/lead";

class DatabaseService {

  private leads: Lead[] = [];

  async saveLead(lead: Lead): Promise<Lead> {
    this.leads.push(lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return [...this.leads].reverse();
  }

  async getLead(leadId: string): Promise<Lead | undefined> {
    return this.leads.find((l) => l.leadId === leadId);
  }

  async count(): Promise<number> {
    return this.leads.length;
  }

  async getBySource(source: string): Promise<Lead[]> {
    return this.leads.filter((l) => l.source === source).reverse();
  }

  async getByStatus(status: string): Promise<Lead[]> {
    return this.leads.filter((l) => l.status === status).reverse();
  }

}

export const Database = new DatabaseService();
