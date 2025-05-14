import { ComplaintStatus } from "./complaint.models";

export interface ComplaintFullResponseModel {
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  status: ComplaintStatus;
  createdAt: Date;
  closedAt: Date | null;
  createdByUserName: string | null;
  closedByUserName: string | null;
  answers: ComplaintAnswerResponseModel[];
}

export interface ComplaintAnswerResponseModel {
  complaintId: string | null;
  answer: string | null;
  anseredByUserName: string | null;
  answeredAt: Date;
}