import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewReservationComponent } from './components/view-reservation/view-reservation.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { RouterModule } from '@angular/router';
import { ViewAreaComponent } from './components/view-area/view-area.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewReservationComponent, ReservationFormComponent, ViewAreaComponent, AreaFormComponent],
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [ViewReservationComponent, ReservationFormComponent, ViewAreaComponent, AreaFormComponent],
})
export class AreaReservationModule {}
