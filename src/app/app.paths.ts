export interface RoutePaths {
  login: string;
  register: string;
  home: string;
  createComplaint: string;
  viewComplaint: string;
  createCondominalService: string;
  viewCondominalService: string;
  personalInfo: string;
  wildcard: string;
}

export const ROUTE_PATHS: RoutePaths = {
  login: 'login',
  register: 'register',
  home: 'home',
  createComplaint: 'complaints/create',
  viewComplaint: 'complaints/view',
  createCondominalService: 'condominal-service/create',
  viewCondominalService: 'condominal-service/view/:id',
  personalInfo: 'personal-info',
  wildcard: '**',
};
