export interface User {
    id: number;
    login: string;
    dateCreated: Date;
    amigos: User[];
  }
  