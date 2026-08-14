/**
 * ============================================================
 * TRFSK OMKAR SERVICES PVT LTD
 * Database Layer
 * ============================================================
 *
 * Temporary In-Memory Database
 *
 * Future:
 * PostgreSQL
 * Prisma ORM
 *
 * ============================================================
 */

import { Lead } from "@/app/lib/lead";

class DatabaseService {

  private leads: Lead[] = [];

  /**
   * Save Lead
   */
  async saveLead(lead: Lead): Promise<Lead> {

    this.leads.push(lead);

    return lead;

  }

  /**
   * Get All Leads
   */
  async getLeads(): Promise<Lead[]> {

    return this.leads;

  }

  /**
   * Get Lead By Lead ID
   */
  async getLead(leadId: string): Promise<Lead | undefined> {

    return this.leads.find(

      (lead) => lead.leadId === leadId

    );

  }

  /**
   * Count Leads
   */
  async count(): Promise<number> {

    return this.leads.length;

  }

  /**
   * Get Leads By Source
   */
  async getBySource(

    source: Lead["source"]

  ): Promise<Lead[]> {

    return this.leads.filter(

      (lead) => lead.source === source

    );

  }

  /**
   * Get Leads By Status
   */
  async getByStatus(

    status: Lead["status"]

  ): Promise<Lead[]> {

    return this.leads.filter(

      (lead) => lead.status === status

    );

  }

}

export const Database = new DatabaseService();