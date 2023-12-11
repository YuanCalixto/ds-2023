import { Tag } from "./tag";
import { Users } from "./users";

export interface Tasks {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    creator: Users;
    dateCreated: Date;
    lastUpdated: Date;
    tags: Tag[];
  }
  