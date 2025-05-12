import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ViewPersonalInfoModel } from "../models/view-personal-info.model";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../core/shared/api-response.model";

@Injectable({
  providedIn: "root"
})
export class CondominalManagerService {
  private readonly API_URL = "https://localhost:7020/api";

  constructor(
    private http: HttpClient
  ) {}

  public getCondominalManagerInfo(): Observable<ApiResponse<ViewPersonalInfoModel>> {
    return this.http.get<ApiResponse<ViewPersonalInfoModel>>(`${this.API_URL}/CondominalManager/GetCurrentCondominalManager`);
  }

  public updateCondominalManagerInfo(condominalManagerInfo: ViewPersonalInfoModel): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.API_URL}/CondominalManager/Update`, condominalManagerInfo);
  }
}