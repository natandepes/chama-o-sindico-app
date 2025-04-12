export enum ComplaintStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export interface ComplaintMock {
  id: number;
  subject: string;
  occurredDate: Date;
  resolvedDate: Date | null;
  status: ComplaintStatus;
  category: string;
  description: string;
  photo: string;
}
