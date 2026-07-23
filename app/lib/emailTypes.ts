export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

export interface AttachmentFile {
  filename: string;
  path: string;
}