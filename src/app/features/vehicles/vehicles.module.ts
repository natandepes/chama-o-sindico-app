import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormVehiclesComponent } from './components/form-vehicles/form-vehicles.component';
import { ViewVehiclesComponent } from './components/view-vehicles/view-vehicles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [FormVehiclesComponent, ViewVehiclesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink, 
    FormsModule
  ],
  exports: [
    FormVehiclesComponent,
    ViewVehiclesComponent
  ]
})
export class VehiclesModule { }
