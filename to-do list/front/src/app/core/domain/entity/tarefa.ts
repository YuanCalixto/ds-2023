import { Tag } from "./tag";
import { Usuario } from "./usuario";

export interface Tarefa {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    creator: Usuario;
    dateCreated: Date;
    lastUpdated: Date;
    tags: Tag[];
  }
  