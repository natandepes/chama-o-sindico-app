import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  private loginModel!: LoginModel;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  protected onSubmit() {
    if (this.loginForm.valid) {
      this.loginModel = this.transformToLoginModel();
      
      this.authService.login(this.loginModel).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.authService.setToken(response.data.token);
            this.authService.setUserInfo(response.data.name, response.data.userId);

            this.loginForm.reset();

            this.router.navigate(['/complaints/create']);

            alert('Login realizado com sucesso!');

            return;
          }

          if (response.success == false) {
            alert(response.message);
            this.loginForm.reset();
          }
        },
        error: () => {
          alert('Ocorreu um erro ao registrar o usuário. Tente novamente mais tarde.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  private transformToLoginModel(): LoginModel {
    let model: LoginModel;

    model = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    return model;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}