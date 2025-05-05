import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';
import { ApiResponse } from '../../../core/shared/api-response.model';
import { AreaReservation } from '../models/area-reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = 'https://localhost:7020/api';

  public getAreas(): Observable<ApiResponse<Area[]>> {
    return this.http.get<ApiResponse<Area[]>>(`${this.baseUrl}/Area/GetAllAreas`);
  }

  public getArea(id: string): Observable<ApiResponse<Area>> {
    return this.http.get<ApiResponse<Area>>(`${this.baseUrl}/Area/GetAreaById/${id}`);
  }

  public saveArea(area: Area): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/Area/SaveArea`, area);
  }

  public deleteArea(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/Area/DeleteArea/${id}`);
  }

  public getAreaReservations(): Observable<ApiResponse<AreaReservation[]>> {
    return this.http.get<ApiResponse<AreaReservation[]>>(`${this.baseUrl}/Area/GetAllAreaReservations`);
  }

  public getAreaReservation(id: string): Observable<ApiResponse<AreaReservation>> {
    return this.http.get<ApiResponse<AreaReservation>>(`${this.baseUrl}/Area/GetAreaReservationById/${id}`);
  }
  
  public getUserAreaReservations(id: string): Observable<ApiResponse<AreaReservation[]>> {
    return this.http.get<ApiResponse<AreaReservation[]>>(`${this.baseUrl}/Area/GetAllAreaReservationsByUser/${id}`);
  }

  public saveAreaReservation(areaReservation: AreaReservation): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/Area/SaveAreaReservation`, areaReservation);
  }

  public deleteAreaReservation(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/Area/DeleteAreaReservation/${id}`);
  }
}
