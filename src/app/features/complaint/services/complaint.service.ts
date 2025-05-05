
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ApiResponse, ComplaintMock, ComplaintStatus } from '../models/complaint.models';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {

  
  
  constructor(private http: HttpClient) { }

  
  private readonly apiUrl = 'http://localhost:5158'; // Temporario

  getAllComplaints(): Observable<ComplaintMock[]> {
    return this.http.get<ComplaintMock[]>(`${this.apiUrl}/api/Complaint/GetAllComplaints`);
  }

  getAllComplaintsByUserId(): Observable<ComplaintMock[]> {
    return this.http.get<ComplaintMock[]>(`${this.apiUrl}/api/Complaint/GetAllComplaintsAsyncByUserId`);
  }

  createComplaint(complaintData: ComplaintMock): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.apiUrl}/api/Complaint/CreateComplaint`,
      complaintData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  deleteComplaint(idComplaint: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/Complaint/DeleteComplaint`, 
      JSON.stringify(idComplaint),
      {
        headers: {'Content-Type': 'application/json'}
      }
    );
  }


  // getComplaintById(id: number): Observable<ComplaintMock> {
  //   const complaint = this.complaints.find(d => d.id === id);
  //   if (!complaint) {
  //     return throwError(() => new Error('Denúncia não encontrada'));
  //   }
  //   return of(complaint);
  // }
}