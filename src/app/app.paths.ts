export interface RoutePaths {
  login: string;
  register: string;
  home: string;
  createComplaint: string;
  viewComplaint: string;
  createCondominalService: string;
  viewCondominalService: string;
  listComplaints: string;
  contactInfo: string;
  personalInfo: string;
  viewArea: string;
  formArea: string;
  formAreaEdit: string;
  viewReservation: string;
  formReservation: string;
  formReservationEdit: string;
  wildcard: string;
}

export const ROUTE_PATHS: RoutePaths = {
  login: 'login',
  register: 'register',
  home: 'home',
  createComplaint: 'complaints/create',
  viewComplaint: 'complaints/view',
  listComplaints: 'complaints/list',
  viewReservation: 'reservations/view',
  viewArea: 'areas/view',
  formArea: 'areas/form',
  formAreaEdit: 'areas/form/:id',
  formReservation: 'reservations/form',
  formReservationEdit: 'reservations/form/:id',
  createCondominalService: 'condominal-service/create',
  viewCondominalService: 'condominal-service/view/:id',
  contactInfo: 'contact-info',
  personalInfo: 'personal-info',
  wildcard: '**',
};
