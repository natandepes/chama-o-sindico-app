export interface AreaReservation {
    id?: string;
    areaId: string;
    areaName: string;
    createdByUserId: string;
    startDate: Date;
    endDate: Date;
    createdAt?: Date;
    status: 1 | 2 | 3;
}

export enum AreaReservationStatusEnum {
    Pending = 1,
    Approved = 2,
    Rejected = 3,
}