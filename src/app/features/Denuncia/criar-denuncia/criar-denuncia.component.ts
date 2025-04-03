import { Component } from '@angular/core';
import { complaintMock, StatusDenuncia } from '../models/denuncia.models';

@Component({
  selector: 'app-criar-denuncia',
  templateUrl: './criar-denuncia.component.html',
  styleUrls: ['./criar-denuncia.component.css'],
  standalone: false
})
export class CriarDenunciaComponent {
  id: number | undefined;
  assunto: string = '';
  dataOcorrido: string = '';
  descricao: string = '';
  categoria: string = 'Outros';
  imageUrl: string | ArrayBuffer | null = null;
  isMobile: boolean = false;


  salvarDenuncia() {
    const denuncia: complaintMock = {
      Id: this.id,
      Assunto: this.assunto,
      DataOcorrido: new Date(this.dataOcorrido),
      DataResolvido: undefined,
      Status: StatusDenuncia.Pendente,
      Categoria: this.categoria,
      Descricao: this.descricao,
      Foto: this.imageUrl as string | undefined
    };
  
    const json = JSON.stringify(denuncia, null, 2);
    this.salvarArquivo(json, 'denuncia.json'); 
  }

  salvarArquivo(json: string, nomeArquivo: string) {
    console.log('Salvando arquivo:', nomeArquivo); 
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  openImagePicker() {
    const input = document.createElement('input');
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

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  handleFile(file: File) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione uma imagem válida.');
    }
  }
}