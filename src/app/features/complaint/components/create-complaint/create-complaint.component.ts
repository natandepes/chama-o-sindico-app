import { Component } from '@angular/core';
import { ComplaintMock, ComplaintStatus } from '../../models/complaint.models';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html',
  styleUrl: './create-complaint.component.scss',
  standalone: false,
})


export class CreateComplaintComponent {
  id: string = '';
  title: string = '';
  description: string = '';
  imageUrl: string | ArrayBuffer | null = null;
  status!: ComplaintStatus;
  createdAt!: Date;
  closedAt!: Date;
  createdByUserId: string = '';
  closedByUserId: string = '';
  isMobile: boolean = false;

  constructor(private complaintService: ComplaintService) {}

  createComplaint(): void {
    const complaint: ComplaintMock = {
      title: this.title,
      id: '',
      createdAt: new Date(this.createdAt),
      closedAt: null,
      status: ComplaintStatus.Pending,
      description: this.description,
      imageUrl: this.imageUrl ? (this.imageUrl as string) : '',
      createdByUserId: this.createdByUserId,
      closedByUserId: this.closedByUserId ? null: ''
    };

    this.complaintService.createComplaint(complaint).subscribe({
      next: (response) => {
        console.log('Complaint created successfully')
      },
      error:(err) => {
        console.log('Error', err)
      }
    })
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
        this.imageUrl = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please, select a valid image.');
    }
  }
}
