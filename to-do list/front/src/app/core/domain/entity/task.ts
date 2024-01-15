import { Tag } from './tag';
import { User } from './user';

export interface Task {
  id: number;
  dateCreated: Date;

  name: string;
  description: string;
  completed: boolean;
  creator: User;
  lastUpdated: Date;
  tags: Tag[];
  listId: string;
}
