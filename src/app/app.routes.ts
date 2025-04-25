import { Route } from '@angular/router';
import { ROUTE_PATHS } from './app.paths';
import { CreateCondominalServiceComponent } from './features/condominal-services/components/create-condominal-services/create-condominal-services.component';
import { ViewCondominalServiceComponent } from './features/condominal-services/components/view-condominal-services/view-condominal-services.component';
import { CreateComplaintComponent } from './features/complaint/components/create-complaint/create-complaint.component';
import { ViewComplaintComponent } from './features/complaint/components/view-complaint/view-complaint.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { ContactInfoComponent } from './features/contact-info/components/contact-info/contact-info.component';
import { HomeComponent } from './features/home/components/home.component';

export const appRoutes: Route[] = [
  { path: ROUTE_PATHS.login, component: LoginComponent },
  { path: ROUTE_PATHS.home, component: HomeComponent },
  { path: ROUTE_PATHS.createCondominalService, component: CreateCondominalServiceComponent },
  { path: ROUTE_PATHS.viewCondominalService, component: ViewCondominalServiceComponent },
  { path: ROUTE_PATHS.createComplaint, component: CreateComplaintComponent },
  { path: ROUTE_PATHS.viewComplaint, component: ViewComplaintComponent },
  { path: ROUTE_PATHS.contactInfo, component: ContactInfoComponent },
  { path: ROUTE_PATHS.wildcard, redirectTo: ROUTE_PATHS.home, pathMatch: 'full' },
];
