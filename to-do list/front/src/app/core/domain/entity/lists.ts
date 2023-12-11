import { Tarefa } from "./tarefa";

export interface Lists {
    id: number;
    name: string;
    dateCreated: Date;
    tasks: Tarefa[]
  }
  