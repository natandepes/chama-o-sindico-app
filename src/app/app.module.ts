import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CondominialServicesModule } from './features/condominal-services/condominal-services.module';
import { LoginModule } from './features/authentication/login.module';
import { ComplaintModule } from './features/complaint/complaint.module';
import { SharedModule } from './features/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule, 
    BrowserModule, 
    ComplaintModule, 
    CondominialServicesModule,
    LoginModule, 
    SharedModule, 
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule { }
