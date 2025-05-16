import { Component, ViewEncapsulation } from '@angular/core';
import { ComplaintMock, ComplaintStatus } from '../../models/complaint.models';
import { ComplaintService } from '../../services/complaint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../app.paths';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html',
  styleUrl: './create-complaint.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class CreateComplaintComponent {
  protected complaintForm: FormGroup;
  private complaintModel!: ComplaintMock;

  closedAt!: Date;
  userId: string | null = '';
  closedByUserId: string = '';
  urlImagem: string | ArrayBuffer | null = '';
  protected maxDate: string = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().split('T')[0];

  constructor(
    private complaintService: ComplaintService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loader: LoaderService,
  ) {
    this.complaintForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      createdAt: ['', Validators.required],
      imageUrl: [''],
      imageType: [''],
    });
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  createComplaint(): void {
    if (this.complaintForm.valid) {
      if (confirm('Você tem certeza que deseja criar a denúncia? Ela não poderá ser editada depois!')) {
        this.loader.show();
        this.loader.show();
        this.complaintModel = this.transformToComplaintModel();

        this.complaintService.createComplaint(this.complaintModel).subscribe({
          next: response => {
            if (response.success) {
              this.complaintForm.reset();
              this.loader.hide();
              this.loader.hide();
              this.router.navigate([ROUTE_PATHS.listComplaints]);
            }
          },
          error: err => {
            this.loader.hide();
            console.error('Erro ao criar a denúncia:', err);
            alert('Erro ao criar a denúncia. Tente novamente mais tarde.');
          },
        });
      }
    } else {
      alert('Preencha os campos obrigatórios corretamente');
    }
  }

  openImgSelector(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  handleFile(file: File): void {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        this.urlImagem = e.target?.result || null;

        this.complaintForm.patchValue({
          imageUrl: this.urlImagem,
          imageType: file.type,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione uma imagem válida.');
    }
  }

  private transformToComplaintModel(): ComplaintMock {
    return {
      title: this.complaintForm.get('title')?.value,
      description: this.complaintForm.get('description')?.value,
      imageUrl: this.complaintForm.get('imageUrl')?.value,
      createdAt: this.complaintForm.get('createdAt')?.value,
      createdByUserId: this.userId,
      imageType: this.complaintForm.get('imageType')?.value,
    };
  }

  removeImage(): void {
    this.urlImagem = '';
    this.complaintForm.patchValue({
      imageUrl: '',
      imageType: '',
    });
  }

  goBack(): void {
    this.router.navigate([ROUTE_PATHS.listComplaints]);
  }
}
