import { Route } from '@angular/router';
import { ROUTE_PATHS } from './app.paths';
import { CreateCondominalServiceComponent } from './features/condominal-services/components/create-condominal-services/create-condominal-services.component';
import { ViewCondominalServiceComponent } from './features/condominal-services/components/view-condominal-services/view-condominal-services.component';
import { CreateComplaintComponent } from './features/complaint/components/create-complaint/create-complaint.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { ListComplaintsComponent } from './features/complaint/components/list-complaints/list-complaints.component';

export const appRoutes: Route[] = [
  { path: ROUTE_PATHS.login, component: LoginComponent },
  { path: ROUTE_PATHS.home, component: CreateComplaintComponent }, // Vai mudar, é só pra deixar padronizado já
  { path: ROUTE_PATHS.createCondominalService, component: CreateCondominalServiceComponent },
  { path: ROUTE_PATHS.viewCondominalService, component: ViewCondominalServiceComponent },
  { path: ROUTE_PATHS.createComplaint, component: CreateComplaintComponent },
  { path: ROUTE_PATHS.listComplaints, component: ListComplaintsComponent },
  { path: ROUTE_PATHS.wildcard, redirectTo: ROUTE_PATHS.home, pathMatch: 'full' },
];
