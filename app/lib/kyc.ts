/**
 * ============================================================
 * TRFSK OMKAR SERVICES PVT LTD
 * KYC Manager
 * ============================================================
 */

export type KycStatus =
  | "PENDING"
  | "SUBMITTED"
  | "VERIFIED"
  | "REJECTED";

export interface KycDocument {
  type:
    | "AADHAR"
    | "PAN"
    | "PASSPORT"
    | "DRIVING_LICENSE"
    | "BANK_PROOF"
    | "PHOTO"
    | "CHEQUE";

  fileName: string;

  uploadedAt: Date;

  verified: boolean;
}

export interface KycProfile {
  partnerId?: string;

  fullName: string;

  email: string;

  phone: string;

  address?: string;

  city?: string;

  state?: string;

  pincode?: string;

  panNumber?: string;

  aadharNumber?: string;

  bankName?: string;

  accountNumber?: string;

  ifsc?: string;

  nomineeName?: string;

  status: KycStatus;

  documents: KycDocument[];
}

export class KycManager {
  static isComplete(profile: KycProfile): boolean {
    return (
      !!profile.fullName &&
      !!profile.email &&
      !!profile.phone &&
      profile.documents.length > 0
    );
  }

  static verifiedDocuments(profile: KycProfile): number {
    return profile.documents.filter((doc) => doc.verified).length;
  }

  static pendingDocuments(profile: KycProfile): number {
    return profile.documents.filter((doc) => !doc.verified).length;
  }

  static updateStatus(profile: KycProfile): KycStatus {
    if (!this.isComplete(profile)) {
      return "PENDING";
    }

    if (this.pendingDocuments(profile) > 0) {
      return "SUBMITTED";
    }

    return "VERIFIED";
  }
}