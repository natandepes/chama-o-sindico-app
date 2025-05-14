import { Component } from '@angular/core';
import { ComplaintMock, ComplaintStatus } from '../../models/complaint.models';
import { ComplaintService } from '../../services/complaint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../app.paths';

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html',
  styleUrl: './create-complaint.component.scss',
  standalone: false,
})


export class CreateComplaintComponent {
  protected complaintForm: FormGroup;
  private complaintModel!: ComplaintMock

  closedAt!: Date;
  userId: string | null = '';
  closedByUserId: string = '';
  urlImagem: string | ArrayBuffer | null = '';
  isMobile: boolean = false;
  

  constructor(
    private complaintService: ComplaintService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.complaintForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description:['', Validators.required],
        createdAt: ['', Validators.required],
      })
  }


  ngOnInit()
  {
    this.userId = localStorage.getItem('userId');
  }

  createComplaint(): void {
    if(this.complaintForm.valid)
    {
      if (confirm('Você tem certeza que deseja criar a denúncia? Ela não poderá ser editada depois!')) {
        this.complaintModel = this.transformToComplaintModel();

        this.complaintService.createComplaint(this.complaintModel).subscribe({
          next: (response) => {
            if (response.success) {
              alert('Reclamação criada com sucesso!');
              this.complaintForm.reset();
              this.router.navigate([ROUTE_PATHS.listComplaints]);
            }
          }
        })
      }
    }
    else{
      alert('Preencha os campos obrigatórios corretamente')
    }
  }

  openImagePicker(): void {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.handleFile(file);
      }
    };
    input.click();
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
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please, select a valid image.');
    }
  }

  private transformToComplaintModel(): ComplaintMock 
  {
    let model: ComplaintMock;
    
    model = 
    {
      title: this.complaintForm.get('title')?.value,
      description: this.complaintForm.get('description')?.value,
      imageUrl: this.urlImagem,
      createdAt: this.complaintForm.get('createdAt')?.value,
      createdByUserId : this.userId

    }
    
    return model;
  }
}
