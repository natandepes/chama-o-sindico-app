import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResidentService } from '../../../personal-info/services/resident.service';
import { ViewPersonalInfoModel } from '../../../personal-info/models/view-personal-info.model';
import { WarningService } from '../../services/warning.service';
import { WarningModel } from '../../models/warning.model';
import { ROUTE_PATHS } from '../../../../app.paths';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-create-warning',
  standalone: false,
  templateUrl: './create-warning.component.html',
  styleUrl: './create-warning.component.css'
})
export class CreateWarningComponent implements OnInit {
  warningForm!: FormGroup;
  residents!: ViewPersonalInfoModel[];

  constructor(
    private fb: FormBuilder,
    private warningService: WarningService,
    private residentService: ResidentService,
    private router: Router,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.loadResidents();
    this.initForm();

    this.warningForm.get('residentId')?.valueChanges.subscribe((residentId) => {
      const selectedResident = this.residents.find(resident => resident.id === residentId);
      if (selectedResident) {
        this.warningForm.patchValue({
          residentUserId: selectedResident.userId
        });
      }
    })
  }

  private loadResidents() {
    this.loader.show();
    this.residentService.getAllResidents().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.residents = response.data;
          this.loader.hide();
        } else {
          this.loader.hide();
          alert("Falha ao carregar os residentes, por favor, tente novamente.");
        }
      }
    });
  }

  private initForm() {
    this.warningForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      targetType: ['all', Validators.required],
      residentId: [''],
      residentUserId: [''],
    });
  }

  private transformToWarningModel(): WarningModel {
    let model: WarningModel;
    
    model = {
      title: this.warningForm.get('title')?.value,
      description: this.warningForm.get('description')?.value,
      targetType: this.warningForm.get('targetType')?.value,
      residentId: this.warningForm.get('residentId')?.value,
      residentUserId: this.warningForm.get('residentUserId')?.value
    };
    
    return model;
  }

  onSubmit(): void {
    if (this.warningForm.valid) {
      this.loader.show();

      let warningModel = this.transformToWarningModel();

      this.warningService.createWarning(warningModel).subscribe({
        next: (response) => {
          if (response.success) {
            this.loader.hide();
            this.warningForm.reset();
            this.router.navigate([ROUTE_PATHS.viewWarnings]);
          } else {
            this.loader.hide();
            alert("Falha ao criar o aviso, por favor, tente novamente.");
          }
        }
      })
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }
}
