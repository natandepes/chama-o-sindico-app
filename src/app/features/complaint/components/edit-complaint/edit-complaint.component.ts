import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintMock } from '../../models/complaint.models';
import { ComplaintService } from '../../services/complaint.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-complaint',
  standalone: false,
  templateUrl: './edit-complaint.component.html',
  styleUrl: './edit-complaint.component.scss'
})
export class EditComplaintComponent {
  protected complaintForm: FormGroup;
  private complaintModel!: ComplaintMock

  closedAt!: Date;
  userId: string | null = '';
  idComplaint: string | null = '';
  closedByUserId: string = '';
  urlImagem: string | ArrayBuffer | null = '';
  isMobile: boolean = false;


  constructor(
    private complaintService: ComplaintService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
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
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.idComplaint = id;
      this.loadComplaint(id)
    }else{
      console.log('Nenhum ID de Denúncia fornecido.')
    }
  }

  loadComplaint(id: string)
  {
    this.complaintService.getComplaintById(id).subscribe({
      next: (complaint) => {
        this.complaintModel = complaint;
        this.urlImagem = complaint.imageUrl;
        this.complaintForm.patchValue({
          title: complaint.title,
          description: complaint.description,
          createdAt: complaint.createdAt
        });  
      }, error: err => {
        console.error('Error ao carregaqr denuncia: ', err)
      }
    });
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

  editComplaint()
  {
    if(this.complaintForm.invalid || !this.complaintModel?.id) return;

    const complaint: ComplaintMock = {
      id: this.complaintModel.id,
      title: this.complaintForm.get('title')?.value,
      description: this.complaintForm.get('description')?.value,
      imageUrl: this.urlImagem,
      status: this.complaintModel.status ?? CopmplaintStatus.Pending,  // TODOSSSSSS
      createdAt: this.complaintForm.get('createdAt')?.value,
      closedAt: this.complaintModel.closedAt ?? null,
      createdByUserId: this.userId,
      closedByUserId: null
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
