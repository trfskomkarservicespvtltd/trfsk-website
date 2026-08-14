import { ContactEmailData } from "./emailTypes";

export type LeadSource =
  | "Website Contact"
  | "Newsletter"
  | "Partnership"
  | "Investor"
  | "Knowledge Centre"
  | "Referral"
  | "Manual";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Agreement Sent"
  | "Partner"
  | "Rejected"
  | "Closed";

export type LeadPriority =
  | "Low"
  | "Medium"
  | "High";

export interface LeadRecord extends ContactEmailData {
  id: string;

  source: LeadSource;

  status: LeadStatus;

  priority: LeadPriority;

  createdAt: Date;

  updatedAt: Date;

  assignedTo?: string;

  notes?: string;

  nextFollowUp?: Date;
}

export function createLead(
  data: ContactEmailData,
  source: LeadSource = "Website Contact"
): LeadRecord {

  const now = new Date();

  return {

    id:
      "TRFSK-" +
      now.getTime().toString(),

    ...data,

    source,

    status: "New",

    priority: "Medium",

    createdAt: now,

    updatedAt: now,

  };

}

export function updateLeadStatus(
  lead: LeadRecord,
  status: LeadStatus
): LeadRecord {

  return {

    ...lead,

    status,

    updatedAt: new Date(),

  };

}

export function assignLead(
  lead: LeadRecord,
  user: string
): LeadRecord {

  return {

    ...lead,

    assignedTo: user,

    updatedAt: new Date(),

  };

}

export function addLeadNote(
  lead: LeadRecord,
  note: string
): LeadRecord {

  return {

    ...lead,

    notes: lead.notes
      ? lead.notes + "\n\n" + note
      : note,

    updatedAt: new Date(),

  };

}