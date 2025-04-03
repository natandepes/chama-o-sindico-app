import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { complaintMock, StatusDenuncia } from './models/denuncia.models';
import bdJson from '../../../assets/data/bd.json';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private complaints: complaintMock[] = this.convertJsonToComplaintMock(bdJson);

  private convertJsonToComplaintMock(jsonData: any[]): complaintMock[] {
    return jsonData.map(item => ({
      ...item,
      DataOcorrido: new Date(item.DataOcorrido),
      DataResolvido: item.DataResolvido ? new Date(item.DataResolvido) : undefined,
      Status: item.Status as StatusDenuncia
    }));
  }

  private jsonUrl = 'assets/data/bd.json'; 

  constructor(private http: HttpClient) { }

  getAllComplaints(): Observable<complaintMock[]> {
    return of(this.complaints);
  }

  getComplaintById(id: number): Observable<complaintMock> {
    const complaint = this.complaints.find(d => d.Id === id);
    if (!complaint) {
      return throwError(() => new Error('Denúncia não encontrada'));
    }
    return of(complaint);
  }
}
