export interface RoutePaths {
  home: string;
  createComplaint: string;
  viewComplaint: string;
  wildcard: string;
}

export const ROUTE_PATHS: RoutePaths = {
  home: 'home',
  createComplaint: 'complaints/create',
  viewComplaint: 'complaints/view',
  wildcard: '**',
};
