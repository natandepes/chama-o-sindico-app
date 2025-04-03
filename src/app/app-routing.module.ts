import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarDenunciaComponent } from './features/Denuncia/criar-denuncia/criar-denuncia.component';
import { ViewComplaintComponent } from './features/Denuncia/view-complaint/view-complaint.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'create-complaint', component: CriarDenunciaComponent }, 
  { path: 'view-complaint', component: ViewComplaintComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
