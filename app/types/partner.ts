export type PartnerStatus =
  | "NEW"
  | "UNDER_REVIEW"
  | "KYC_PENDING"
  | "KYC_VERIFIED"
  | "AGREEMENT_PENDING"
  | "ACTIVE"
  | "REJECTED"
  | "SUSPENDED";

export interface Partner {
  id: string;

  fullName: string;

  email: string;

  phone: string;

  company?: string;

  city?: string;

  state?: string;

  country?: string;

  source?: string;

  status: PartnerStatus;

  createdAt: Date;

  updatedAt: Date;
}