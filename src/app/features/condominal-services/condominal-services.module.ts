import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreateCondominalServiceComponent,
    ViewCondominalServiceComponent
  ]
})
export class CondominialServicesModule { }