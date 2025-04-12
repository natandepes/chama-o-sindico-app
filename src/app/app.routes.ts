import { Route } from '@angular/router';
import { ROUTE_PATHS } from './app.paths';
import { CreateComplaintComponent } from './features/complaint/components/create-complaint/create-complaint.component';
import { ViewComplaintComponent } from './features/complaint/components/view-complaint/view-complaint.component';

export const appRoutes: Route[] = [
  { path: ROUTE_PATHS.home, component: CreateComplaintComponent }, // Vai mudar, é só pra deixar padronizado já
  { path: ROUTE_PATHS.createComplaint, component: CreateComplaintComponent },
  { path: ROUTE_PATHS.viewComplaint, component: ViewComplaintComponent },
  { path: ROUTE_PATHS.wildcard, redirectTo: ROUTE_PATHS.home, pathMatch: 'full' },
];
