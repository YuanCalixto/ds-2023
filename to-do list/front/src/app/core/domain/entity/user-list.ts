import { List } from './list';
import { User } from './user';

export interface UserList {
  id: number;
  dateCreated: Date;
  lastUpdated: Date;
  username: String;
  list: List;
  user: User;
}
