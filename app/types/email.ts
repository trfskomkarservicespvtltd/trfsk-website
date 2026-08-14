export interface EmailAddress {
  name: string;
  email: string;
}

export interface EmailAttachment {
  filename: string;
  path: string;
}

export interface SendEmailOptions {
  to: string;

  subject: string;

  html: string;

  replyTo?: string;

  attachments?: EmailAttachment[];
}