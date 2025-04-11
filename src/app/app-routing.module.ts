import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarDenunciaComponent } from './features/Denuncia/criar-denuncia/criar-denuncia.component';
import { ViewComplaintComponent } from './features/Denuncia/view-complaint/view-complaint.component';
import { LoginComponent } from './features/Auth/login/login.component';
import { RegisterComponent } from './features/Auth/register/register.component';
import { AuthGuard } from './features/Auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'create-complaint', component: CriarDenunciaComponent, canActivate: [AuthGuard] }, 
  { path: 'view-complaint', component: ViewComplaintComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
