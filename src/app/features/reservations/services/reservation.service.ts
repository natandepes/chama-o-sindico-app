import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';
import { ApiResponse } from '../../../core/shared/api-response.model';
import { AreaReservation } from '../models/area-reservation.model';
import { AreaReservationResponse } from '../models/area-reservation-response.model';
import { AreaReservationAnswerModel } from '../models/area-reservation-answer.model';
import { AreaReservationFullModel } from '../models/area-reservation-full.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = 'http://localhost:5158/api';

  public getAreas(): Observable<ApiResponse<Area[]>> {
    return this.http.get<ApiResponse<Area[]>>(`${this.baseUrl}/Area/GetAllAreas`);
  }

  public getArea(id: string): Observable<ApiResponse<Area>> {
    return this.http.get<ApiResponse<Area>>(`${this.baseUrl}/Area/GetAreaById/${id}`);
  }

  public createArea(area: Area): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/Area/CreateArea`, area);
  }

  public deleteArea(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/Area/DeleteArea/${id}`);
  }

  public getAllAreaReservations(): Observable<ApiResponse<AreaReservationResponse[]>> {
    return this.http.get<ApiResponse<AreaReservationResponse[]>>(`${this.baseUrl}/Area/GetAllAreaReservations`);
  }

  public getAreaReservation(id: string): Observable<ApiResponse<AreaReservationFullModel>> {
    return this.http.get<ApiResponse<AreaReservationFullModel>>(`${this.baseUrl}/Area/GetAreaReservationById/${id}`);
  }

  public getUserAreaReservations(): Observable<ApiResponse<AreaReservationResponse[]>> {
    return this.http.get<ApiResponse<AreaReservationResponse[]>>(`${this.baseUrl}/Area/GetAllAreaReservationsByUser`);
  }

  public saveAreaReservation(areaReservation: AreaReservation): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/Area/SaveAreaReservation`, areaReservation);
  }

  public deleteAreaReservation(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/Area/DeleteAreaReservation/${id}`);
  }

  public addAnswerToAreaReservation(answer: AreaReservationAnswerModel): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/Area/AddAnswerToAreaReservation`, answer);
  }

  public changeAreaReservationStatus(areaReservationId: string, status: number): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/Area/ChangeAreaReservationStatus/`, { areaReservationId, status });
  }
}
