import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected email: string = '';
  protected password: string = '';
  protected errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  protected login() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: (response: any) => {
          console.log("JWT Token:", response.token);
          this.authService.setToken(response.token);
          this.router.navigate(['/create-complaint']);
        },
        error: (error: any) => {
          console.error('Login error:', error);
        },
      });
  }

  protected logout() {
    this.authService.logout();
  }
}
