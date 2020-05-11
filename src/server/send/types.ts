export interface EmailRequest {
  from: string;
  to: string;
  subject: string;
  template: string;
  data: any;
}