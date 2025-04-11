import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CondominalManagerContactInfoModule } from './features/condominal-manager-contact-info/condominal-manager-contact-info.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CondominalManagerContactInfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
