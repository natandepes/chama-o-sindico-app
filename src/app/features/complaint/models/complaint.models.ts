
export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
  statusCode: number;
}
export enum ComplaintStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export interface ComplaintMock {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: ComplaintStatus;
  createdAt: Date;
  closedAt: Date | null;
  createdByUserId: string;
  closedByUserId: string | null;
}
