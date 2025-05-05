export interface AreaReservation {
    id: number;
    areaId: number;
    userId: number;
    openTime: Date;
    closeTime: Date;
    status: boolean;
}