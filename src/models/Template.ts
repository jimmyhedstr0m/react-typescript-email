import { TemplateType } from './TemplateType';

export interface Template {
  id: TemplateType;
  name: string;
  description?: string;
  mock: any;
}