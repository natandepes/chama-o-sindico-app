import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewPersonalInfoModel } from '../../models/view-personal-info.model';
import { ResidentService } from '../../services/resident.service';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-personal-info',
  standalone: false,
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {
  protected personalInfoForm!: FormGroup;
  private viewPersonalInfoModel!: ViewPersonalInfoModel;

  constructor(
    private fb: FormBuilder,
    private residentService: ResidentService,
    private authService: AuthService
  ) {
    this.personalInfoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rg: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      birthDate: ['', Validators.required],
      apartmentNumber: ['', Validators.required],
      id: [''],
      userId: ['']
    });
  }

  ngOnInit(): void {
    this.loadResidentInfo();
  }

  private tranformToViewPersonalInfoModel(): ViewPersonalInfoModel {
    let model: ViewPersonalInfoModel;

    model = {
      id: this.personalInfoForm.get('id')?.value,
      userId: this.personalInfoForm.get('userId')?.value,
      name: this.personalInfoForm.get('name')?.value,
      email: this.personalInfoForm.get('email')?.value,
      rg: this.personalInfoForm.get('rg')?.value,
      cpf: this.personalInfoForm.get('cpf')?.value,
      phone: this.personalInfoForm.get('phone')?.value,
      birthDate: this.personalInfoForm.get('birthDate')?.value,
      apartmentNumber: this.personalInfoForm.get('apartmentNumber')?.value
    };

    return model;
  }

  protected onSubmit(): void {
    if (this.personalInfoForm.valid) {
      this.viewPersonalInfoModel = this.tranformToViewPersonalInfoModel();
        
        this.residentService.updateResidentInfo(this.viewPersonalInfoModel).subscribe({
          next: (response) => {
            if (response.success) {
              alert(response.message);
              this.personalInfoForm.reset();
              this.loadResidentInfo();
            } else {
              alert('Ocorreu um erro ao atualizar as informações pessoais. Tente novamente mais tarde.');
            }
          },
          error: () => {
            alert('Ocorreu um erro ao atualizar as informações pessoais. Tente novamente mais tarde.');
          }
        });
      } else {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  protected deleteResident(): void {
    this.authService.deleteUser(this.personalInfoForm.get('userId')?.value).subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message);
          this.personalInfoForm.reset();
          this.authService.logout();
        } else {
          alert('Ocorreu um erro ao excluir o usuário. Tente novamente mais tarde.');
        }
      },
      error: () => {
        alert('Ocorreu um erro ao excluir o usuário. Tente novamente mais tarde.');
      }
    });
  }

  private loadResidentInfo(): void {
    this.residentService.getResidentInfo().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.personalInfoForm.patchValue(response.data);
        } else {
          alert(response.message || 'Ocorreu um erro ao carregar as informações pessoais. Tente novamente mais tarde.');
        }
      },
      error: () => {
        alert('Ocorreu um erro ao carregar as informações pessoais. Tente novamente mais tarde.');
      }
    });
  }
}
