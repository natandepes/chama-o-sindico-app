import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CondominialServicesModule } from './features/condominal-services/condominal-services.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginModule } from './features/authentication/login.module';
import { CriarDenunciaComponent } from './features/Denuncia/criar-denuncia/criar-denuncia.component';

@NgModule({
  declarations: [
    AppComponent,
    CriarDenunciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CondominialServicesModule,
    LoginModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }