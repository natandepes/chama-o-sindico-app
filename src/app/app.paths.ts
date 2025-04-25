export interface RoutePaths {
  login: string;
  home: string;
  createComplaint: string;
  viewComplaint: string;
  createCondominalService: string;
  viewCondominalService: string;
  viewArea: string;
  formArea: string;
  viewReservation: string;
  formReservation: string;
  wildcard: string;
}

export const ROUTE_PATHS: RoutePaths = {
  login: 'login',
  home: 'home',
  createComplaint: 'complaints/create',
  viewComplaint: 'complaints/view',
  viewReservation: 'reservations/view',
  viewArea: 'areas/view',
  formArea: 'areas/form',
  formReservation: 'reservations/form',
  createCondominalService: 'condominal-service/create',
  viewCondominalService: 'condominal-service/view/:id',
  wildcard: '**',
};
