import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = 'https://localhost:7020';

  public getAreas(): Observable<object[]> {
    return this.http.get<object[]>(`${this.baseUrl}/Area/GetAllAreas`);
  }

  public getArea(id: number): Observable<object[]> {
    return this.http.get<object[]>(`${this.baseUrl}/Area/GetAreaById/${id}`);
  }

  public SaveArea(area: object): Observable<object[]> {
    return this.http.post<object[]>(`${this.baseUrl}/Area/SaveArea`, area);
  }

  public DeleteArea(id: number): Observable<object[]> {
    return this.http.delete<object[]>(`${this.baseUrl}/Area/DeleteArea/${id}`);
  }

  public getAreaReservations(id: number): Observable<object[]> {
    return this.http.get<object[]>(`${this.baseUrl}/Area/GetAllAreaReservations/${id}`);
  }

  public getAreaReservation(id: number): Observable<object[]> {
    return this.http.get<object[]>(`${this.baseUrl}/Area/GetAreaReservationById/${id}`);
  }

  public saveAreaReservation(areaReservation: object): Observable<object[]> {
    return this.http.post<object[]>(`${this.baseUrl}/Area/SaveAreaReservation`, areaReservation);
  }

  public deleteAreaReservation(id: number): Observable<object[]> {
    return this.http.delete<object[]>(`${this.baseUrl}/Area/DeleteAreaReservation/${id}`);
  }
}
