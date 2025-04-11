import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../core/shared/api-response.model';

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
        next: (response: ApiResponse<string>) => {
          if (response.success === false) {
            this.errorMessage = response.message!;
            return;
          }

          this.authService.setToken(response.data!);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'An error occurred during login. Please try again.';
        }
      });
  }

  protected logout() {
    this.authService.logout();
  }
}
