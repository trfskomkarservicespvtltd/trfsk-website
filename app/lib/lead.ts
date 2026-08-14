/**
 * ============================================================
 * TRFSK OMKAR SERVICES PVT LTD
 * Lead Management
 * ============================================================
 */

export type LeadSource =
  | "CONTACT"
  | "PARTNERSHIP"
  | "NEWSLETTER"
  | "WEBSITE";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "INTERESTED"
  | "DOCUMENTATION"
  | "PAYMENT_PENDING"
  | "ACTIVE_PARTNER"
  | "COMPLETED";

export interface LeadHistory {
  timestamp: string;
  action: string;
  description: string;
}

export interface LeadNotification {
  timestamp: string;
  message: string;
  read: boolean;
}

export interface Lead {
  leadId: string;

  source: LeadSource;

  status: LeadStatus;

  createdAt: string;

  updatedAt: string;

  name?: string;

  email: string;

  phone?: string;

  company?: string;

  subject?: string;

  message?: string;

  history: LeadHistory[];

  notifications: LeadNotification[];
}

/**
 * Generate Unique Lead ID
 * Example:
 * TRFSK-20260802-583921
 */
export function generateLeadId(): string {

  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");

  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");

  return `TRFSK-${year}${month}${day}-${random}`;

}

/**
 * Indian Date & Time
 */
export function getLeadDate(): string {

  return new Date().toLocaleString("en-IN", {

    timeZone: "Asia/Kolkata",

    dateStyle: "medium",

    timeStyle: "short",

  });

}

/**
 * Create Standard Lead Object
 */
export function createLead(data: {

  source: LeadSource;

  name?: string;

  email: string;

  phone?: string;

  company?: string;

  subject?: string;

  message?: string;

}): Lead {

  const timestamp = new Date().toISOString();

  return {

    leadId: generateLeadId(),

    source: data.source,

    status: "NEW",

    createdAt: timestamp,

    updatedAt: timestamp,

    name: data.name,

    email: data.email,

    phone: data.phone,

    company: data.company,

    subject: data.subject,

    message: data.message,

    history: [

      {

        timestamp,

        action: "LEAD_CREATED",

        description: "Lead created from website.",

      },

    ],

    notifications: [

      {

        timestamp,

        message: "New lead received.",

        read: false,

      },

    ],

  };

}