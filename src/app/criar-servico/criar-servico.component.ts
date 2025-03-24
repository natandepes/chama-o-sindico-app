import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criar-servico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-servico.component.html',
  styleUrls: ['./criar-servico.component.css']
})
export class CriarServicoComponent {
  formularioServico: FormGroup;
  imagemSelecionada: File | null = null;
  imagemPreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.formularioServico = this.fb.group({
      nomeServico: ['', Validators.required],
      nomePrestador: ['', Validators.required],
      telefoneContato: ['', Validators.required],
      descricaoServico: [''],
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.processarImagem(file);
    }
  }
  
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
  
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processarImagem(file);
    }
  }
  abrirSeletorDeImagem(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
  removerImagem(): void {
    this.imagemSelecionada = null;
    this.imagemPreview = null;
  }
  
  // Função compartilhada para reutilizar a lógica
  private processarImagem(file: File): void {
    if (file.type.startsWith('image/')) {
      this.imagemSelecionada = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;

  //   if (input.files && input.files.length > 0) {
  //     this.imagemSelecionada = input.files[0];

  //     // Gera uma URL de preview da imagem
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagemPreview = reader.result as string;
  //     };
  //     reader.readAsDataURL(this.imagemSelecionada);
  //   }
  // }

  onSubmit() {
    console.log(this.formularioServico.value);
  }
}
