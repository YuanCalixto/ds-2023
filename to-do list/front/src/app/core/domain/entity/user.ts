export interface User {
    id: string;
    login: string;
    dateCreated: Date;
    amigos: User[];
  }
  