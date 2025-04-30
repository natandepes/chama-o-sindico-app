import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResidentRegistrationComponent } from './components/resident-registration/resident-registration.component';

@NgModule({
  declarations: [LoginComponent, ResidentRegistrationComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [LoginComponent],
})
export class AuthenticationModule {}
