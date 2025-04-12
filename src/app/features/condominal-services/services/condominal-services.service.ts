// servico.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CondominalServicesService {
  saveService(id: string, dados: Record<string, unknown>): void {
    dados = { ...dados, imagemUrl: '../../images/bon-clay.jpg' };
    localStorage.setItem(`servico-${id}`, JSON.stringify(dados));
    console.log('Serviço salvo com ID:', id);
    console.log(dados);
  }

  getService(id: string) {
    const dados = localStorage.getItem(`servico-${id}`);
    console.log('Buscando serviço com ID:', id);
    return dados ? JSON.parse(dados) : null;
  }
}
