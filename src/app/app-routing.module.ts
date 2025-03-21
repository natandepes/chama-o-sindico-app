import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarDenunciaComponent } from './features/Denuncia/criar-denuncia/criar-denuncia.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'criar-denuncia', component: CriarDenunciaComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
