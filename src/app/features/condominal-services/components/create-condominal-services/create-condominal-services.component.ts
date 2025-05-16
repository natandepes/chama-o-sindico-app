import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CondominalService } from '../../models/condominal-service.model';
import { CondominalServicesService } from '../../services/condominal-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../app.paths';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-condominal-services.component.html',
  styleUrl: './create-condominal-services.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class CreateCondominalServiceComponent implements OnInit {
  serviceForm: FormGroup;
  serviceId!: string;
  selectedImg: File | null = null;
  previewImg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private condominalServicesService: CondominalServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService
  ) {
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

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    if (this.serviceId) {
      this.loader.show();
      this.condominalServicesService.getService(this.serviceId).subscribe({
        next: response => {
          if (response.success) {
            this.serviceForm.patchValue({
              title: response.data?.title,
              providerName: response.data?.providerName,
              cellphone: response.data?.cellphone,
              description: response.data?.description,
              photoUrl: response.data?.providerPhotoUrl,
              imageType: response.data?.imageType,
            });

            this.previewImg = response.data?.providerPhotoUrl!;
            this.loader.hide();
          } else {
            this.loader.hide();
            alert('Erro ao buscar o serviço. Tente novamente mais tarde.');
          }
        }
      });
    }
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
          imageType: file.type,
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

    if (this.serviceId) {
      condominalService.id = this.serviceId;
    }

    this.loader.show();

    this.condominalServicesService.saveService(condominalService).subscribe({
      next: response => {
        if (response.success) {
          this.serviceForm.reset();
          this.removeImg();
          this.loader.hide();
          this.router.navigate(['condominal-service/view/' + response.data]);
        } else {
          this.loader.hide();
          alert('Erro ao salvar o serviço. Tente novamente mais tarde.');
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate([ROUTE_PATHS.listCondominalService]);
  }
}
