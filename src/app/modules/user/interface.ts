export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPPER_ADMIN = 'SUPPER_ADMIN',
}

export interface IUser {
  email: string;
  full_name: string;
  avatar_url?: string | null;
  password: string;
  role: Role;
  phone: string;
  created_at: Date;
  updated_at: Date;
}
