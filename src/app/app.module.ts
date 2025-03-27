import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservasComponent } from './features/reservas/reservas.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CriarReservaComponent } from './features/reservas/criar-reserva/criar-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservasComponent,
    CriarReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
