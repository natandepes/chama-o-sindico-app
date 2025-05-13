import { AreaReservationStatusEnum } from "./area-reservation.model";

export interface AreaReservationFullModel {
  areaName: string;
  areaId: string;
  createdByUserName: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  status: AreaReservationStatusEnum;
  answers: AreaReservationAnswerResponseModel[];
}

export interface AreaReservationAnswerResponseModel {
  areaReservationId: string;
  answer: string;
  answeredByUserName: string | null;
  answeredAt: Date;
}