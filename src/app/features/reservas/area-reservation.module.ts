import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaReservationComponent } from './components/view-area-reservation/area-reservation.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { RouterModule } from '@angular/router';
import { ViewAreaComponent } from './components/view-area/view-area.component';
import { FormAreaComponent } from './components/form-area/form-area.component';



@NgModule({
  declarations: [
    AreaReservationComponent,
    ReservationFormComponent,
    ViewAreaComponent,
    FormAreaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AreaReservationComponent,
    ReservationFormComponent
  ]
})
export class AreaReservationModule { }
