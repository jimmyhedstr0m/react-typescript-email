export interface EmailRequest {
  subject: string;
  data: object;
}

export type Callback = (err: Error | undefined, html: string) => any;