import { User } from './user';

export interface Task {
  id: string;
  dateCreated: Date;

  name: string;
  description: string;
  completed: boolean;
  user: User;
  lastUpdated: Date;
  listId: string;
}
