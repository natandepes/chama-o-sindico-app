import { Component } from '@angular/core';
import { ComplaintMock, ComplaintStatus } from '../../models/complaint.models';

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html',
  styleUrl: './create-complaint.component.scss',
  standalone: false,
})
export class CreateComplaintComponent {
  id: number | null = null;
  subject: string = '';
  occurredDate: string = '';
  description: string = '';
  category: string = 'Others';
  imageUrl: string | ArrayBuffer | null = null;
  isMobile: boolean = false;

  saveComplaint(): void {
    const denuncia: ComplaintMock = {
      id: this.id!,
      subject: this.subject,
      occurredDate: new Date(this.occurredDate),
      resolvedDate: null,
      status: ComplaintStatus.Pending,
      category: this.category,
      description: this.description,
      photo: this.imageUrl ? (this.imageUrl as string) : '',
    };

    const json: string = JSON.stringify(denuncia, null, 2);
    this.salvarArquivo(json, 'denuncia.json');
  }

  salvarArquivo(json: string, fileName: string): void {
    console.log('Saving file:', fileName);
    const blob = new Blob([json], { type: 'application/json' });
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
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
