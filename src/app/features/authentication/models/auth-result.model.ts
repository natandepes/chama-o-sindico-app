import { UserRole } from "./user-roles.model";

export interface AuthResultModel {
  token: string;
  name: string;
  userId: string;
  role: UserRole;
}