import { Partner } from "@/app/types/partner";
import { Logger } from "./logger";

export class PartnerService {

  /**
   * Create Partner
   */
  static async create(
    data: Omit<Partner, "id" | "createdAt" | "updatedAt">
  ): Promise<Partner> {

    const partner: Partner = {

      id: this.generateId(),

      ...data,

      createdAt: new Date(),

      updatedAt: new Date(),

    };

    Logger.success(
      "PARTNER",
      "CREATE_PARTNER",
      "Partner record created.",
      partner
    );

    return partner;
  }

  /**
   * Update Partner
   */
  static async update(
    partner: Partner
  ): Promise<Partner> {

    partner.updatedAt = new Date();

    Logger.info(
      "PARTNER",
      "UPDATE_PARTNER",
      "Partner updated.",
      partner
    );

    return partner;
  }

  /**
   * Change Status
   */
  static async changeStatus(
    partner: Partner,
    status: Partner["status"]
  ) {

    partner.status = status;

    partner.updatedAt = new Date();

    Logger.success(
      "PARTNER",
      "STATUS_CHANGED",
      `Partner status changed to ${status}`,
      partner
    );

    return partner;
  }

  /**
   * Generate Partner ID
   */
  private static generateId() {

    const random = Math.floor(
      100000 + Math.random() * 900000
    );

    return `TRFSK-${random}`;

  }

}

export default PartnerService;