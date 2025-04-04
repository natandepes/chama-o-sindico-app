import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CondominialServicesModule } from './features/condominal-services/condominal-services.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CondominialServicesModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }