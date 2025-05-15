
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplaintMock } from '../models/complaint.models';
import { ApiResponse } from '../../../core/shared/api-response.model';
import { ComplaintAnswerModel } from '../models/complaint-answer.model';
import { ComplaintResponseModel } from '../models/complaint-response.model';
import { ComplaintFullResponseModel } from '../models/complaint-full-response.model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {

  
  
  constructor(private http: HttpClient) { }

  
  private readonly apiUrl = 'http://localhost:5158'; // Temporario

  getAllComplaints(): Observable<ApiResponse<ComplaintResponseModel[]>> {
    return this.http.get<ApiResponse<ComplaintResponseModel[]>>(`${this.apiUrl}/api/Complaint/GetAllComplaints`);
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

  updateComplaint(complaint: ComplaintMock): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/Complaint/EditComplaint`, complaint);
  }
  
  getComplaintById(id: string): Observable<ApiResponse<ComplaintFullResponseModel>> {
    return this.http.get<ApiResponse<ComplaintFullResponseModel>>(`${this.apiUrl}/api/Complaint/GetComplaintById/${id}`);
  }

  addAnswerToComplaint(answer: ComplaintAnswerModel): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>( `${this.apiUrl}/api/Complaint/AddAnswerToComplaint`, answer);
  }

  changeComplaintStatus(complaintId: string, status: number): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/api/Complaint/ChangeComplaintStatus`, { complaintId, status });
  }
}