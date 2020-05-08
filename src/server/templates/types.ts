export interface EmailRequest {
  subject: string;
  data: any;
}

export type Callback = (err: Error | undefined, html: string) => any;