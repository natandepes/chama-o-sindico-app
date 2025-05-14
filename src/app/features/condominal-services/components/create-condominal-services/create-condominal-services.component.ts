import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CondominalService } from '../../models/condominal-service.model';

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

  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      serviceProvider: ['', Validators.required],
      phone: ['', Validators.required],
      serviceDescription: [''],
      img: [''],
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
          img: this.previewImg,
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
      id: crypto.randomUUID(),
      title: formValue.serviceName,
      providerName: formValue.serviceProvider,
      cellphone: formValue.phone,
      description: formValue.serviceDescription,
      photoUrl: formValue.img,
    };
    console.log('Condominal service:', condominalService);
  }
}
