import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResidentRegistrationModel } from '../../models/resident-registration.model';
import { UserRole } from '../../models/user-roles.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../app.paths';

@Component({
  selector: 'app-resident-registration',
  standalone: false,
  templateUrl: './resident-registration.component.html',
  styleUrl: './resident-registration.component.css'
})
export class ResidentRegistrationComponent {
  protected registrationForm: FormGroup;
  private residentRegistrationModel!: ResidentRegistrationModel;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rg: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      birthDate: ['', Validators.required],
      apartmentNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  protected onSubmit(): void {
    if (this.registrationForm.valid) {
      this.residentRegistrationModel = this.transformToResidentRegistrationModel();
      
      this.authService.register(this.residentRegistrationModel).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.authService.setToken(response.data.token);
            this.authService.setUserInfo(response.data.name, response.data.userId);
            
            this.registrationForm.reset();
            
            alert('Usuário registrado com sucesso!');

            this.router.navigate([ROUTE_PATHS.home]);
            
            return;
          }

          alert(response.message || 'Ocorreu um erro ao registrar o usuário. Tente novamente mais tarde.');
        }
      });

    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  private transformToResidentRegistrationModel(): ResidentRegistrationModel {
    let model: ResidentRegistrationModel;

    model = {
      name: this.registrationForm.get('name')?.value,
      email: this.registrationForm.get('email')?.value,
      rg: this.registrationForm.get('rg')?.value,
      cpf: this.registrationForm.get('cpf')?.value,
      phone: this.registrationForm.get('phone')?.value,
      birthDate: this.registrationForm.get('birthDate')?.value,
      apartmentNumber: this.registrationForm.get('apartmentNumber')?.value,
      password: this.registrationForm.get('password')?.value,
      role: UserRole.Resident
    };

    return model;
  }
}
