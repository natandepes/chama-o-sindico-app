export interface RoutePaths {
  login: string;
  register: string;
  home: string;
  createComplaint: string;
  viewComplaint: string;
  createCondominalService: string;
  viewCondominalService: string;
  listCondominalService: string;
  editCondominalService: string;
  listComplaints: string;
  contactInfo: string;
  personalInfo: string;
  listResidents: string;
  viewArea: string;
  formArea: string;
  formAreaEdit: string;
  viewReservation: string;
  formReservation: string;
  viewVehicle: string;
  formVehicle: string;
  editVehicle: string;
  formReservationEdit: string;
  createWarning: string;
  viewWarnings: string;
  wildcard: string;
}

export const ROUTE_PATHS: RoutePaths = {
  login: 'login',
  register: 'register',
  home: 'home',
  createComplaint: 'complaints/create',
  viewComplaint: 'complaints/view/:id',
  listComplaints: 'complaints/list',
  viewReservation: 'reservations/view',
  viewArea: 'areas/view',
  formArea: 'areas/form',
  formAreaEdit: 'areas/form/:id',
  formReservation: 'reservations/form',
  viewVehicle: 'vehicles/view',
  formVehicle: 'vehicles/form',
  editVehicle: 'vehicles/form/:id',
  formReservationEdit: 'reservations/form/:id',
  createCondominalService: 'condominal-service/create',
  editCondominalService: 'condominal-service/edit/:id',
  viewCondominalService: 'condominal-service/view/:id',
  listCondominalService: 'condominal-service/list',
  contactInfo: 'contact-info',
  personalInfo: 'personal-info',
  listResidents: 'residents/list',
  createWarning: 'warnings/create',
  viewWarnings: 'warnings/view',
  wildcard: '**',
};
