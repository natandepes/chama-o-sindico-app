import { UserRole } from "./user-roles.model";

export interface ResidentRegistrationModel {
  // Resident's properties
  name: string;
  email: string;
  rg: string;
  cpf: string;
  phone: string;
  birthDate: Date;
  apartmentNumber: number;

  // Account's properties
  password: string;
  role: UserRole;
}