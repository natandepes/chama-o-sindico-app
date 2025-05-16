export enum ComplaintStatus {
  Pending = 'Pendente',
  InProgress = 'Em progresso',
  Resolved = 'Resolvida',
}

export enum ComplaintStatusEnum {
  Pending = 0,
  InProgress = 1,
  Resolved = 2,
}

export interface ComplaintMock {
  id?: string | null;
  title: string;
  description: string;
  imageUrl: string | ArrayBuffer | null;
  imageType: string;
  status?: ComplaintStatus;
  createdAt: Date;
  closedAt?: Date | null;
  createdByUserId: string | null;
  closedByUserId?: string | null;
}
