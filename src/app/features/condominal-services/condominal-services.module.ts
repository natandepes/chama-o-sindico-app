import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewCondominalServiceComponent } from './components/view-condominal-services/view-condominal-services.component';
import { CreateCondominalServiceComponent } from './components/create-condominal-services/create-condominal-services.component';

@NgModule({
  declarations: [
    CreateCondominalServiceComponent,
    ViewCondominalServiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateCondominalServiceComponent,
    ViewCondominalServiceComponent
  ]
})
export class CondominialServicesModule { }