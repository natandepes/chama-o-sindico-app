import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarDenunciaComponent } from './features/Denuncia/criar-denuncia/criar-denuncia.component';
import { ViewComplaintComponent } from './features/Denuncia/view-complaint/view-complaint.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { LoginComponent } from './features/Auth/login/login.component';
import { RegisterComponent } from './features/Auth/register/register.component';
import { AuthInterceptor } from './features/Auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CriarDenunciaComponent,
    ViewComplaintComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
