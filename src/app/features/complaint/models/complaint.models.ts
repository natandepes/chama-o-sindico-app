export enum ComplaintStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export interface ComplaintMock {
  id: string;
  description: string;
  imageUrl: string;
  status: ComplaintStatus;
  createdAt: Date;
  closedAt: Date | null;
  createdByUserId: string;
}
