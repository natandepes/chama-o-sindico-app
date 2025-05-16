import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewPersonalInfoModel } from '../../models/view-personal-info.model';
import { ResidentService } from '../../services/resident.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { CondominalManagerService } from '../../services/condominal-manager.service';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-personal-info',
  standalone: false,
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {
  protected personalInfoForm!: FormGroup;
  private viewPersonalInfoModel!: ViewPersonalInfoModel;
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;

  constructor(
    private fb: FormBuilder,
    private residentService: ResidentService,
    private condominalManagerService: CondominalManagerService,
    private authService: AuthService,
    private loader: LoaderService
  ) {
    this.personalInfoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rg: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      birthDate: ['', Validators.required],
      apartmentNumber: [''],
      salary: [''],
      id: [''],
      userId: ['']
    });
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.applyRoleBasedValidators();
    this.loadPersonalInfo();
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
      apartmentNumber: this.personalInfoForm.get('apartmentNumber')?.value,
      salary: this.personalInfoForm.get('salary')?.value
    };

    return model;
  }

  protected onSubmit(): void {
    if (this.personalInfoForm.valid) {
        this.viewPersonalInfoModel = this.tranformToViewPersonalInfoModel();

        if (this.userRole == this.UserRoleEnum.CondominalManager) {
          this.loader.show();
          this.condominalManagerService.updateCondominalManagerInfo(this.viewPersonalInfoModel).subscribe({
            next: (response) => {
              if (response.success) {
                this.personalInfoForm.reset();
                this.loadPersonalInfo();
                this.loader.hide();
              } else {
                this.loader.hide();
                alert('Ocorreu um erro ao atualizar as informações pessoais. Tente novamente mais tarde.');
              }
            }
          });
        } else {
          this.loader.show();
          this.residentService.updateResidentInfo(this.viewPersonalInfoModel).subscribe({
            next: (response) => {
              if (response.success) {
                this.personalInfoForm.reset();
                this.loadPersonalInfo();
                this.loader.hide();
              } else {
                this.loader.hide();
                alert('Ocorreu um erro ao atualizar as informações pessoais. Tente novamente mais tarde.');
              }
            }
          });
        }
        
      } else {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  protected deleteResident(): void {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    this.loader.show();

    this.authService.deleteUser(this.personalInfoForm.get('userId')?.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.loader.hide();
          this.personalInfoForm.reset();
          this.authService.logout();
        } else {
          this.loader.hide();
          alert('Ocorreu um erro ao excluir o usuário. Tente novamente mais tarde.');
        }
      },
      error: () => {
        this.loader.hide();
        alert('Ocorreu um erro ao excluir o usuário. Tente novamente mais tarde.');
      }
    });
  }

  private loadPersonalInfo(): void {
    if (this.userRole == this.UserRoleEnum.CondominalManager) {
      this.loader.show();
      this.condominalManagerService.getCondominalManagerInfo().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.personalInfoForm.patchValue(response.data);
            this.loader.hide();
          } else {
            this.loader.hide();
            alert('Ocorreu um erro ao carregar as informações pessoais. Tente novamente mais tarde.');
          }
        },
        error: () => {
          this.loader.hide();
          alert('Ocorreu um erro ao carregar as informações pessoais. Tente novamente mais tarde.');
        }
      })
    } else {
      this.loader.show();
      this.residentService.getResidentInfo().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.personalInfoForm.patchValue(response.data);
            this.loader.hide();
          } else {
            this.loader.hide();
            alert('Ocorreu um erro ao carregar as informações pessoais. Tente novamente mais tarde.');
          }
        },
        error: () => {
          this.loader.hide();
          alert('Ocorreu um erro ao carregar as informações pessoais. Tente novamente mais tarde.');
        }
      });
    }
  }

  private applyRoleBasedValidators(): void {
    const salary = this.personalInfoForm.get('salary');
    const apartment = this.personalInfoForm.get('apartmentNumber');
  
    if (this.userRole === this.UserRoleEnum.CondominalManager) {
      salary?.setValidators([Validators.required, Validators.min(0)]);
      apartment?.clearValidators();
    } else {
      apartment?.setValidators([Validators.required]);
      salary?.clearValidators();
    }
  
    salary?.updateValueAndValidity();
    apartment?.updateValueAndValidity();
  }
}
