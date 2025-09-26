export interface IRole {
  id: number;
  name: "admin" | "member";
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
  role: IRole;
  tokens?: IToken[] | null;
}

export interface IPaginatedUsers {
  data: IUser[];
  meta: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    order: string;
    page: number;
    q: string | null;
    total: number;
    totalPages: number;
  };
}

export interface IUserResetPassword {
  newPassword: string;
  confirmation: string;
}

export interface IUserChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmation: string;
}
