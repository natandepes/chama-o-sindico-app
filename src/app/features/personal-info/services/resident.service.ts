import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../core/shared/api-response.model";
import { ViewPersonalInfoModel } from "../models/view-personal-info.model";

@Injectable({
  providedIn: "root",
})
export class ResidentService {
  private readonly API_URL = "https://localhost:7020/api";

  constructor(
    private http: HttpClient
  ) {}

  public getResidentInfo(): Observable<ApiResponse<ViewPersonalInfoModel>> {
    return this.http.get<ApiResponse<ViewPersonalInfoModel>>(`${this.API_URL}/Resident/GetResidentDetails`);
  }

  public updateResidentInfo(residentInfo: ViewPersonalInfoModel): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.API_URL}/Resident/Update`, residentInfo);
  }

  public getAllResidents(): Observable<ApiResponse<ViewPersonalInfoModel[]>> {
    return this.http.get<ApiResponse<ViewPersonalInfoModel[]>>(`${this.API_URL}/Resident/GetAllResidents`);
  }
}