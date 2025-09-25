export interface IRole {
  id: number;
  nom: "admin" | "member";
}

export type TokenType = "reset_password" | "verification_email" | "refresh";

export interface IToken {
  id: number;
  token: string;
  type: TokenType;
  date_expiration: string;
}

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  is_active: boolean;
  phone?: string | null;
  birthday: dateTime;
  last_login: dateTime;

  roles: IRole[];
  tokens?: IToken[] | null;
}

export interface IUserResetPassword {
  newPassword: string;
  confirmation: string;
}
