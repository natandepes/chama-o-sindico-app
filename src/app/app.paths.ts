export interface RoutePaths {
  login: string;
  home: string;
  createComplaint: string;
  viewComplaint: string;
  createCondominalService: string;
  viewCondominalService: string;
  listComplaints: string;
  wildcard: string;
}

export const ROUTE_PATHS: RoutePaths = {
  login: 'login',
  home: 'home',
  createComplaint: 'complaints/create',
  viewComplaint: 'complaints/view',
  listComplaints: 'complaints/list',
  createCondominalService: 'condominal-service/create',
  viewCondominalService: 'condominal-service/view/:id',
  wildcard: '**',
};
