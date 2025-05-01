export interface AreaReservation {
    id?: string;
    areaId: string;
    createdByUserId: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    status: string;
}