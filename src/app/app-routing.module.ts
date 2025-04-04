import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCondominalServiceComponent } from './features/condominal-services/components/view-condominal-services/view-condominal-services.component';
import { CreateCondominalServiceComponent } from './features/condominal-services/components/create-condominal-services/create-condominal-services.component';
import { LoginComponent } from './features/authentication/components/login/login.component';

const routes: Routes = [
  { path: 'service/create', component: CreateCondominalServiceComponent },
  { path: 'service/:id', component: ViewCondominalServiceComponent },
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full'  }, // Redirecionamento correto para a página inicial
  { path: '**', redirectTo: 'login' } // Redireciona qualquer rota inválida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
