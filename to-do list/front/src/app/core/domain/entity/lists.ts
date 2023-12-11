import { Tasks } from "./tasks";

export interface Lists {
    id: number;
    name: string;
    dateCreated: Date;
    tasks: Tasks[]
  }
  