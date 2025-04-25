import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ComplaintMock, ComplaintStatus } from '../models/complaint.models';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  
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
