import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CondominalServicesService } from '../../services/condominal-services.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-condominal-services.component.html',
  styleUrls: ['./create-condominal-services.component.css'],
  standalone: false
})
export class CreateCondominalServiceComponent {

  serviceForm: FormGroup;
  selectedImg: File | null = null;
  previewImg: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private condominalServicesService: CondominalServicesService
  ) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      serviceProvider: ['', Validators.required],
      phone: ['', Validators.required],
      serviceDescription: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processImg(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processImg(event.dataTransfer.files[0]);
    }
  }

  openImgSelector(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  removeImg(): void {
    this.selectedImg = null;
    this.previewImg = null;
  }

  private processImg(file: File): void {
    if (file.type.startsWith('image/')) {
      this.selectedImg = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImg = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const idServico = new Date().getTime().toString(); // Gera um ID único baseado no timestamp
      this.condominalServicesService.saveService(idServico, this.serviceForm.value);
      this.router.navigate(['/service', idServico]);
    }
  }
}
