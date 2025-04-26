import { Route } from '@angular/router';
import { ROUTE_PATHS } from './app.paths';
import { CreateCondominalServiceComponent } from './features/condominal-services/components/create-condominal-services/create-condominal-services.component';
import { ViewCondominalServiceComponent } from './features/condominal-services/components/view-condominal-services/view-condominal-services.component';
import { CreateComplaintComponent } from './features/complaint/components/create-complaint/create-complaint.component';
import { ViewComplaintComponent } from './features/complaint/components/view-complaint/view-complaint.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { ContactInfoComponent } from './features/contact-info/components/contact-info/contact-info.component';
import { HomeComponent } from './features/home/components/home.component';
import { ViewReservationComponent } from './features/reservations/components/view-reservation/view-reservation.component';
import { ReservationFormComponent } from './features/reservations/components/reservation-form/reservation-form.component';
import { ViewAreaComponent } from './features/reservations/components/view-area/view-area.component';
import { AreaFormComponent } from './features/reservations/components/area-form/area-form.component';

export const appRoutes: Route[] = [
  { path: ROUTE_PATHS.login, component: LoginComponent },
  { path: ROUTE_PATHS.home, component: HomeComponent },
  { path: ROUTE_PATHS.createCondominalService, component: CreateCondominalServiceComponent },
  { path: ROUTE_PATHS.viewCondominalService, component: ViewCondominalServiceComponent },
  { path: ROUTE_PATHS.createComplaint, component: CreateComplaintComponent },
  { path: ROUTE_PATHS.viewComplaint, component: ViewComplaintComponent },
  { path: ROUTE_PATHS.contactInfo, component: ContactInfoComponent },
  { path: ROUTE_PATHS.viewReservation, component: ViewReservationComponent },
  { path: ROUTE_PATHS.viewArea, component: ViewAreaComponent },
  { path: ROUTE_PATHS.formArea, component: AreaFormComponent },
  { path: ROUTE_PATHS.formReservation, component: ReservationFormComponent },
  { path: ROUTE_PATHS.wildcard, redirectTo: ROUTE_PATHS.home, pathMatch: 'full' },
];
