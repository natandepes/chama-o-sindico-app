import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCondominalManagerContactInfoComponent } from './features/condominal-manager-contact-info/view-condominal-manager-contact-info/view-condominal-manager-contact-info.component';

const routes: Routes = [
  { path: 'view-condominal-manager-contact-info', component: ViewCondominalManagerContactInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
