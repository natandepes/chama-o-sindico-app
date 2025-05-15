// servico.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CondominalService } from '../models/condominal-service.model';
import { ApiResponse } from '../../../core/shared/api-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CondominalServicesService {

  constructor(private http: HttpClient){}

  private readonly baseUrl = 'https://localhost:7020/api';


  saveService(service: CondominalService): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/CondominalServices/SaveService`, service);
  }

  getAllCondominalServices(): Observable<ApiResponse<CondominalService[]>> {
    return this.http.get<ApiResponse<CondominalService[]>>(`${this.baseUrl}/CondominalServices/GetAllServices`);
  }

  getService(id: string): Observable<ApiResponse<CondominalService>> {
    return this.http.get<ApiResponse<CondominalService>>(`${this.baseUrl}/CondominalServices/GetServiceById/${id}`);
  }

  deleteService(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/CondominalServices/DeleteService/${id}`);
  }
}
  