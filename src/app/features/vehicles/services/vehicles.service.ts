import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/shared/api-response.model';
import { Vehicle } from '../models/vehicles.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }

  private readonly baseUrl = 'https://localhost:7020/api';

  public getAllVehicles(): Observable<ApiResponse<Vehicle[]>> {
    return this.http.get<ApiResponse<Vehicle[]>>(`${this.baseUrl}/Vehicle/GetAllVehicles`);
  }

  public getUserVehicles(): Observable<ApiResponse<Vehicle[]>> {
    return this.http.get<ApiResponse<Vehicle[]>>(`${this.baseUrl}/Vehicle/GetAllVehiclesByUserId`);
  }

  public getVehicleById(id: string): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(`${this.baseUrl}/Vehicle/GetVehicleById/${id}`);
  }

  public saveVehicle(formData: FormData): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/Vehicle/SaveVehicle`, formData);
  }

  public deleteVehicle(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/Vehicle/DeleteVehicle/${id}`);
  }
}
