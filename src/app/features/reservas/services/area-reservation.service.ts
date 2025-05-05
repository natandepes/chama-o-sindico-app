import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/area.models';
import { AreaReservation } from '../models/areaReservation.models';

@Injectable({
  providedIn: 'root'
})
export class AreaReservationService {

  constructor(private http: HttpClient) { }

  private readonly baseUrl = 'https://localhost:7020/api';

  public getAreas() : Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseUrl}/Area/GetAllAreas`);
  }

  public getArea(id: number) : Observable<Area> {
    return this.http.get<Area>(`${this.baseUrl}/Area/GetAreaById/${id}`);
  }

  public SaveArea(area: object) : Observable<null> {
    return this.http.post<null>(`${this.baseUrl}/Area/SaveArea`, area);
  }

  public DeleteArea(id: number) : Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/Area/DeleteArea/${id}`);
  }

  public getAreaReservationsByUser(id: number) : Observable<AreaReservation[]> {
    return this.http.get<AreaReservation[]>(`${this.baseUrl}/Area/GetAllAreaReservationsByUser/${id}`);
  }

  public getAreaReservation(id: number) : Observable<AreaReservation>{
    return this.http.get<AreaReservation>(`${this.baseUrl}/Area/GetAreaReservationById/${id}`);
  }

  public saveAreaReservation(areaReservation: object) : Observable<null>{
    return this.http.post<null>(`${this.baseUrl}/Area/SaveAreaReservation`, areaReservation);
  }

  public deleteAreaReservation(id: number) : Observable<null>{
    return this.http.delete<null>(`${this.baseUrl}/Area/DeleteAreaReservation/${id}`);
  }
}
