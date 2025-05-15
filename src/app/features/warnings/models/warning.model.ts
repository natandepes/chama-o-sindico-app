export interface WarningModel {
  title: string;
  description: string;
  targetType: string;
  residentId: string;
  residentUserId: string;
  createdAt?: Date;
}