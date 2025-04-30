import { Component } from '@angular/core';
import { AuthService } from './features/authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chama-o-sindico-app';

  constructor(public authService: AuthService) {}
}
