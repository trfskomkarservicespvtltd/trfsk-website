/**
 * ============================================================
 * TRFSK OMKAR SERVICES PVT LTD
 * Master Document Generator
 * ============================================================
 */

import { COMPANY } from "@/app/lib/company";
import { PartnerStage } from "@/app/lib/partnerWorkflow";

export type DocumentType =
  | "WELCOME"
  | "KYC"
  | "AGREEMENT"
  | "PAYMENT_RECEIPT"
  | "DEPLOYMENT"
  | "MONTHLY_PAYOUT"
  | "CAPITAL_REFUND"
  | "COMPLETION";

export interface DocumentData {
  partnerName: string;

  email: string;

  phone?: string;

  company?: string;

  amount?: number;

  agreementNo?: string;

  stage?: PartnerStage;
}

export interface GeneratedDocument {
  title: string;

  filename: string;

  content: string;

  generatedAt: Date;
}

export class DocumentGenerator {

  static generate(
    type: DocumentType,
    data: DocumentData
  ): GeneratedDocument {

    const title = this.getTitle(type);

    const filename =
      `${type}_${Date.now()}.txt`;

    const content = this.buildContent(
      type,
      data
    );

    return {

      title,

      filename,

      content,

      generatedAt: new Date(),

    };

  }

  private static getTitle(
    type: DocumentType
  ): string {

    switch (type) {

      case "WELCOME":
        return "Welcome Letter";

      case "KYC":
        return "KYC Request";

      case "AGREEMENT":
        return "Loan Agreement";

      case "PAYMENT_RECEIPT":
        return "Payment Receipt";

      case "DEPLOYMENT":
        return "Deployment Confirmation";

      case "MONTHLY_PAYOUT":
        return "Monthly Payout Letter";

      case "CAPITAL_REFUND":
        return "Capital Refund";

      case "COMPLETION":
        return "Completion Certificate";

      default:
        return "Document";

    }

  }

  private static buildContent(
    type: DocumentType,
    data: DocumentData
  ): string {

    return `
========================================

${COMPANY.name}

========================================

Document Type : ${type}

Partner : ${data.partnerName}

Email : ${data.email}

Company : ${data.company ?? "-"}

Agreement : ${data.agreementNo ?? "-"}

Amount : ₹${data.amount ?? 0}

Stage : ${data.stage ?? "-"}

Generated :

${new Date().toLocaleString()}

========================================

This document was automatically generated
by the TRFSK OMKAR Business System.

========================================
`;

  }

}