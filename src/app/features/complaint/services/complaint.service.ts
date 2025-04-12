import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ComplaintMock, ComplaintStatus } from '../models/complaint.models';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private complaints: ComplaintMock[] = [
    {
      id: 1,
      subject: 'Vazamento de água no corredor',
      occurredDate: new Date('2023-10-15T00:00:00.000Z'),
      resolvedDate: new Date('2023-10-20T00:00:00.000Z'),
      status: ComplaintStatus.Resolved,
      category: 'Infraestrutura',
      description: 'Vazamento persistente no corredor do 3º andar, causando poças e risco de acidente',
      photo: 'vazamento.jpg',
    },
    {
      id: 2,
      subject: 'Barulho excessivo à noite',
      occurredDate: new Date('2023-11-02T00:00:00.000Z'),
      resolvedDate: null,
      status: ComplaintStatus.InProgress,
      category: 'Convívio',
      description: 'Apartamento 302 fazendo barulho após 22h regularmente',
      photo: '',
    },
    {
      id: 3,
      subject: 'Lixo acumulado na área comum',
      occurredDate: new Date('2023-11-10T00:00:00.000Z'),
      resolvedDate: null,
      status: ComplaintStatus.Pending,
      category: 'Limpeza',
      description: 'Sacos de lixo deixados por vários dias próximo à escada de incêndio',
      photo: 'lixo.jpg',
    },
    {
      id: 4,
      subject: 'Elevador quebrado',
      occurredDate: new Date('2023-11-05T00:00:00.000Z'),
      resolvedDate: new Date('2023-11-08T00:00:00.000Z'),
      status: ComplaintStatus.Resolved,
      category: 'Infraestrutura',
      description: 'Elevador A parado entre o 2º e 3º andar',
      photo: 'elevador.jpg',
    },
    {
      id: 5,
      subject: 'Animal solto no condomínio',
      occurredDate: new Date('2023-11-12T00:00:00.000Z'),
      resolvedDate: null,
      status: ComplaintStatus.Pending,
      category: 'Segurança',
      description: 'Cachorro grande solto sem coleira no jardim, assustando moradores',
      photo: 'animal.jpg',
    },
  ];

  getAllComplaints(): Observable<ComplaintMock[]> {
    return of(this.complaints);
  }

  getComplaintById(id: number): Observable<ComplaintMock> {
    const complaint = this.complaints.find(d => d.id === id);
    if (!complaint) {
      return throwError(() => new Error('Denúncia não encontrada'));
    }
    return of(complaint);
  }
}
