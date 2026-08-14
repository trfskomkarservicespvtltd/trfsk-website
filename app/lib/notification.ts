import {
  sendContactEmail,
  sendAutoReply,
  sendNewsletterWelcome,
} from "./mail";

import { ContactEmailData } from "./emailTypes";

export class NotificationService {
  /**
   * Contact Form
   */
  static async contact(data: ContactEmailData) {
    await sendContactEmail(data);

    await sendAutoReply(data);
  }

  /**
   * Newsletter
   */
  static async newsletter(email: string) {
    await sendNewsletterWelcome(email);
  }

  /**
   * Partner Welcome
   * (Phase 3)
   */
  static async partnerWelcome(email: string) {
    console.log("Partner Welcome:", email);
  }

  /**
   * Partner Approval
   */
  static async partnerApproved(email: string) {
    console.log("Partner Approved:", email);
  }

  /**
   * Partner Rejected
   */
  static async partnerRejected(email: string) {
    console.log("Partner Rejected:", email);
  }

  /**
   * Agreement Ready
   */
  static async agreementReady(email: string) {
    console.log("Agreement Ready:", email);
  }

  /**
   * KYC Received
   */
  static async kycReceived(email: string) {
    console.log("KYC Received:", email);
  }

  /**
   * Documents Approved
   */
  static async documentsApproved(email: string) {
    console.log("Documents Approved:", email);
  }

  /**
   * Monthly Statement
   */
  static async monthlyStatement(email: string) {
    console.log("Monthly Statement:", email);
  }

  /**
   * Password Reset
   */
  static async passwordReset(email: string) {
    console.log("Password Reset:", email);
  }

  /**
   * OTP
   */
  static async otp(email: string, otp: string) {
    console.log(`OTP ${otp} sent to ${email}`);
  }
}

export default NotificationService;