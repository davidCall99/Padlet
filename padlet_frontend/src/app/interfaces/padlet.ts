import { Entry } from './entry';

export interface Padlet {
  id: string;
  name: string;
  creator?: string;
  entries?: Entry[];
  url?: string;
  created_at: Date;
  private?: boolean;
  animal?: string;
}
