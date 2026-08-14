export interface PartnershipFormData {
  name: string;
  email: string;
  phone: string;

  company?: string;

  city?: string;

  state?: string;

  country?: string;

  interest: string;

  message: string;
}

export interface PartnershipApiResponse {
  success: boolean;
  message: string;
}