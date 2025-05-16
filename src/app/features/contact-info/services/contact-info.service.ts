import { Injectable } from '@angular/core';
import { ContactInfo } from '../models/contact-info';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/shared/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ContactInfoService {
  private readonly API_URL = 'http://localhost:5158/api';

  constructor(private http: HttpClient) {}

  public getCondominalManagerInfo(): Observable<ApiResponse<ContactInfo>> {
    return this.http.get<ApiResponse<ContactInfo>>(`${this.API_URL}/CondominalManager/GetCurrentCondominalManager`);
  }
}
