import { EntryComment } from './entryComment';

export interface Entry {
  id: string;
  content: string;
  user_id?: string;
  comments?: any[];
  ratings?: any[];
  creator?: string;
}
