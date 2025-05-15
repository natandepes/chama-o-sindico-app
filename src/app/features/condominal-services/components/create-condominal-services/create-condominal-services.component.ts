import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CondominalService } from '../../models/condominal-service.model';
import { CondominalServicesService } from '../../services/condominal-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-condominal-services.component.html',
  styleUrl: './create-condominal-services.component.scss',
  standalone: false,
})
export class CreateCondominalServiceComponent {
  serviceForm: FormGroup;
  selectedImg: File | null = null;
  previewImg: string | null = null;

  constructor(private fb: FormBuilder, private condominalServicesService: CondominalServicesService, private router: Router) {
    // Inicializa o FormBuilder
    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      providerName: ['', Validators.required],
      cellphone: ['', Validators.required],
      imageType: ['', Validators.required],
      description: [''],
      photoUrl: [''],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedImg = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImg = reader.result as string;

        // Se quiser manter no form:
        this.serviceForm.patchValue({
          photoUrl: this.previewImg,
          imageType: file.type
        });
      };
      reader.readAsDataURL(file);
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
    let formValue = this.serviceForm.value;
    let condominalService: CondominalService = {
      title: formValue.title,
      providerName: formValue.providerName,
      cellphone: formValue.cellphone,
      description: formValue.description,
      providerPhotoUrl: formValue.photoUrl,
      imageType: formValue.imageType,
    };
    
    this.condominalServicesService.saveService(condominalService).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Service saved successfully:', response.data);
          this.serviceForm.reset();
          this.removeImg();
          this.router.navigate(["condominal-service/view/" + response.data]);
        } else {
          console.error('Error saving service:', response.message);
        }
      },
      error: (error) => {
        console.error('Error saving service:', error);
      }
    }); 
  }
}
