export interface AreaReservation {
    id?: string;
    areaId: string;
    areaName: string;
    createdByUserId: string;
    startDate: Date;
    endDate: Date;
    createdAt?: Date;
    status: "Approved" | "WaitingApproval" | "Denied";
}