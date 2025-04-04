import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CondominialServicesModule } from './features/condominal-services/condominal-services.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginModule } from './features/authentication/login.module';
import { CriarDenunciaComponent } from './features/Denuncia/criar-denuncia/criar-denuncia.component';
import { ViewComplaintComponent } from './features/Denuncia/view-complaint/view-complaint.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    CriarDenunciaComponent,
    ViewComplaintComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CondominialServicesModule,
    LoginModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }