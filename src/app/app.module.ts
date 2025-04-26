import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeModule } from './features/home/home.module';
import { CondominialServicesModule } from './features/condominal-services/condominal-services.module';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { ComplaintModule } from './features/complaint/complaint.module';
import { SharedModule } from './features/shared/shared.module';
import { ContactInfoModule } from './features/contact-info/contact-info.module';
import { AreaReservationModule } from './features/reservations/area-reservation.module';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { ResidentInfoModule } from './features/resident-info/resident-info.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HomeModule,
    ComplaintModule,
    CondominialServicesModule,
    AreaReservationModule,
    AuthenticationModule,
    ResidentInfoModule,
    SharedModule,
    ContactInfoModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
