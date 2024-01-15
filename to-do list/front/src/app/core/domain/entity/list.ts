import { Task } from "./task";
import { User } from "./user";

export interface List {
    id: string;
    dateCreated: Date;
    name: string;
    user: User

    tasks: Task[];
    listId: string
  }
  