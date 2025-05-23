import { Route } from '@angular/router';
import { ROUTE_PATHS } from './app.paths';
import { CreateCondominalServiceComponent } from './features/condominal-services/components/create-condominal-services/create-condominal-services.component';
import { ViewCondominalServiceComponent } from './features/condominal-services/components/view-condominal-services/view-condominal-services.component';
import { CreateComplaintComponent } from './features/complaint/components/create-complaint/create-complaint.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { ListComplaintsComponent } from './features/complaint/components/list-complaints/list-complaints.component';
import { ContactInfoComponent } from './features/contact-info/components/contact-info/contact-info.component';
import { HomeComponent } from './features/home/components/home.component';
import { ViewReservationComponent } from './features/reservations/components/view-reservation/view-reservation.component';
import { ReservationFormComponent } from './features/reservations/components/reservation-form/reservation-form.component';
import { ViewAreaComponent } from './features/reservations/components/view-area/view-area.component';
import { AreaFormComponent } from './features/reservations/components/area-form/area-form.component';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { ResidentRegistrationComponent } from './features/authentication/components/resident-registration/resident-registration.component';

import { ViewVehiclesComponent } from './features/vehicles/components/view-vehicles/view-vehicles.component';
import { FormVehiclesComponent } from './features/vehicles/components/form-vehicles/form-vehicles.component';
import { PersonalInfoComponent } from './features/personal-info/components/personal-info/personal-info.component';
import { ResidentListComponent } from './features/personal-info/components/resident-list/resident-list.component';
import { ViewComplaintComponent } from './features/complaint/components/view-complaint/view-complaint.component';
import { ListCondominalServicesComponent } from './features/condominal-services/components/list-condominal-services/list-condominal-services.component';
import { CreateWarningComponent } from './features/warnings/components/create-warning/create-warning.component';
import { ViewWarningsComponent } from './features/warnings/components/view-warnings/view-warnings.component';

export const appRoutes: Route[] = [
  {
    path: ROUTE_PATHS.login,
    component: LoginComponent,
  },
  {
    path: ROUTE_PATHS.register,
    component: ResidentRegistrationComponent,
  },
  {
    path: ROUTE_PATHS.home,
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.createCondominalService,
    component: CreateCondominalServiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.viewCondominalService,
    component: ViewCondominalServiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.listCondominalService,
    component: ListCondominalServicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.editCondominalService,
    component: CreateCondominalServiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.createComplaint,
    component: CreateComplaintComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.viewComplaint,
    component: ViewComplaintComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.listComplaints,
    component: ListComplaintsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: ROUTE_PATHS.personalInfo,
    component: PersonalInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.listResidents,
    component: ResidentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.contactInfo,
    component: ContactInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.viewReservation,
    component: ViewReservationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.viewArea,
    component: ViewAreaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.formArea,
    component: AreaFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.formAreaEdit,
    component: AreaFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.formReservation,
    component: ReservationFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.viewVehicle,
    component: ViewVehiclesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.formVehicle,
    component: FormVehiclesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.editVehicle,
    component: FormVehiclesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.formReservationEdit,
    component: ReservationFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.createWarning,
    component: CreateWarningComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.viewWarnings,
    component: ViewWarningsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.wildcard,
    redirectTo: ROUTE_PATHS.home,
    pathMatch: 'full',
  },
];
