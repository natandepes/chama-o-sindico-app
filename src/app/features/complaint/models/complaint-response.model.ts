import { ComplaintStatus } from "./complaint.models";

export interface ComplaintResponseModel {
  complaintId: string;
  createdAt: Date;
  description: string;
  status: ComplaintStatus;
  title: string;
  createdByUserName: string;
}