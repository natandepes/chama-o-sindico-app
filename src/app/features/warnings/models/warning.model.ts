export interface WarningModel {
  id?: string;
  title: string;
  description: string;
  targetType: string;
  residentId: string;
  residentUserId: string;
  createdAt?: Date;
}
