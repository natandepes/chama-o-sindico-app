import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './features/reservas/reservas.component';
import { CriarReservaComponent } from './features/reservas/criar-reserva/criar-reserva.component';

const routes: Routes = [
  {
    path: 'reservas',
    component: ReservasComponent
  },
  {
    path: 'criarReserva',
    component: CriarReservaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
