/**
 * ============================================================
 * TRFSK OMKAR SERVICES PVT LTD
 * Central Logger
 * ============================================================
 */

export type LogType =
  | "INFO"
  | "SUCCESS"
  | "WARNING"
  | "ERROR";

export type LogModule =
  | "SYSTEM"
  | "CONTACT"
  | "NEWSLETTER"
  | "PARTNER"
  | "KYC"
  | "DOCUMENT"
  | "AGREEMENT"
  | "PAYMENT"
  | "EMAIL"
  | "LOGIN"
  | "ADMIN";

export interface LoggerOptions {
  module: LogModule;
  type: LogType;
  action: string;
  message: string;
  data?: unknown;
}

export class Logger {

  /**
   * Internal logger
   */
  private static write(options: LoggerOptions) {

    const timestamp = new Date().toISOString();

    console.log({
      timestamp,
      module: options.module,
      type: options.type,
      action: options.action,
      message: options.message,
      data: options.data ?? null,
    });

  }

  static info(
    module: LogModule,
    action: string,
    message: string,
    data?: unknown
  ) {

    this.write({
      module,
      type: "INFO",
      action,
      message,
      data,
    });

  }

  static success(
    module: LogModule,
    action: string,
    message: string,
    data?: unknown
  ) {

    this.write({
      module,
      type: "SUCCESS",
      action,
      message,
      data,
    });

  }

  static warning(
    module: LogModule,
    action: string,
    message: string,
    data?: unknown
  ) {

    this.write({
      module,
      type: "WARNING",
      action,
      message,
      data,
    });

  }

  static error(
    module: LogModule,
    action: string,
    message: string,
    data?: unknown
  ) {

    this.write({
      module,
      type: "ERROR",
      action,
      message,
      data,
    });

  }

}