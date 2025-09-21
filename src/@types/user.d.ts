export interface IRole {
    id: number;
    nom: "ADMIN" | "STAFF" | "USER"
  }
  

  export type TokenType = "RESET_PASSWORD" | "VERIFY_EMAIL" | "REFRESH";
  
  export interface IToken {
    id: number;
    token: string;
    type: TokenType;
    date_expiration: string; 
  }
  
  
  export interface IUser {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    est_actif: boolean;
    telephone?: string | null;
    date_naissance: string; 
    derniere_connexion: string; 
    
    roles: IRole[];
    tokens?: IToken[] | null;
  }