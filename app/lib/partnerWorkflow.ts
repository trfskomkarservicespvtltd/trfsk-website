/**
 * ============================================================
 * TRFSK OMKAR SERVICES PVT LTD
 * Master Partner Workflow
 * ============================================================
 */

export enum PartnerStage {
  NEW_LEAD = "NEW_LEAD",

  CONTACTED = "CONTACTED",

  KYC_PENDING = "KYC_PENDING",

  KYC_RECEIVED = "KYC_RECEIVED",

  KYC_VERIFIED = "KYC_VERIFIED",

  DOCUMENT_PENDING = "DOCUMENT_PENDING",

  DOCUMENT_SENT = "DOCUMENT_SENT",

  AGREEMENT_SENT = "AGREEMENT_SENT",

  AGREEMENT_SIGNED = "AGREEMENT_SIGNED",

  PAYMENT_PENDING = "PAYMENT_PENDING",

  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",

  PARTNER_ACTIVE = "PARTNER_ACTIVE",

  MONTHLY_PAYOUT = "MONTHLY_PAYOUT",

  CAPITAL_REFUNDED = "CAPITAL_REFUNDED",

  COMPLETED = "COMPLETED",

  CANCELLED = "CANCELLED",
}

export interface WorkflowStep {
  stage: PartnerStage;

  title: string;

  description: string;

  completed: boolean;
}

export const PartnerWorkflow: WorkflowStep[] = [

  {
    stage: PartnerStage.NEW_LEAD,
    title: "Lead Created",
    description: "Website enquiry received.",
    completed: false,
  },

  {
    stage: PartnerStage.CONTACTED,
    title: "Contacted",
    description: "Initial discussion completed.",
    completed: false,
  },

  {
    stage: PartnerStage.KYC_PENDING,
    title: "KYC Pending",
    description: "Waiting for KYC documents.",
    completed: false,
  },

  {
    stage: PartnerStage.KYC_RECEIVED,
    title: "KYC Received",
    description: "Customer uploaded documents.",
    completed: false,
  },

  {
    stage: PartnerStage.KYC_VERIFIED,
    title: "KYC Verified",
    description: "Documents verified successfully.",
    completed: false,
  },

  {
    stage: PartnerStage.DOCUMENT_PENDING,
    title: "Preparing Documents",
    description: "Agreement generation started.",
    completed: false,
  },

  {
    stage: PartnerStage.DOCUMENT_SENT,
    title: "Documents Sent",
    description: "Documents emailed to partner.",
    completed: false,
  },

  {
    stage: PartnerStage.AGREEMENT_SENT,
    title: "Agreement Sent",
    description: "Agreement shared for signature.",
    completed: false,
  },

  {
    stage: PartnerStage.AGREEMENT_SIGNED,
    title: "Agreement Signed",
    description: "Signed agreement received.",
    completed: false,
  },

  {
    stage: PartnerStage.PAYMENT_PENDING,
    title: "Payment Pending",
    description: "Waiting for deployment payment.",
    completed: false,
  },

  {
    stage: PartnerStage.PAYMENT_RECEIVED,
    title: "Payment Received",
    description: "Capital successfully received.",
    completed: false,
  },

  {
    stage: PartnerStage.PARTNER_ACTIVE,
    title: "Partner Activated",
    description: "Partner account activated.",
    completed: false,
  },

  {
    stage: PartnerStage.MONTHLY_PAYOUT,
    title: "Monthly Payout",
    description: "Monthly payout cycle running.",
    completed: false,
  },

  {
    stage: PartnerStage.CAPITAL_REFUNDED,
    title: "Capital Refunded",
    description: "Capital returned successfully.",
    completed: false,
  },

  {
    stage: PartnerStage.COMPLETED,
    title: "Completed",
    description: "Business cycle completed.",
    completed: false,
  },

  {
    stage: PartnerStage.CANCELLED,
    title: "Cancelled",
    description: "Lead cancelled or closed.",
    completed: false,
  },

];

export function getWorkflowStage(stage: PartnerStage) {
  return PartnerWorkflow.find((item) => item.stage === stage);
}

export function getWorkflowIndex(stage: PartnerStage) {
  return PartnerWorkflow.findIndex((item) => item.stage === stage);
}

export function isWorkflowCompleted(stage: PartnerStage) {
  return (
    stage === PartnerStage.COMPLETED ||
    stage === PartnerStage.CAPITAL_REFUNDED
  );
}

export function isPartnerActive(stage: PartnerStage) {
  return (
    stage === PartnerStage.PARTNER_ACTIVE ||
    stage === PartnerStage.MONTHLY_PAYOUT
  );
}