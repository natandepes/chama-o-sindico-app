import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WarningModel } from "../models/warning.model";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../core/shared/api-response.model";

@Injectable({
  providedIn: "root",
})
export class WarningService {
  private readonly API_URL = "https://localhost:7020/api";

  constructor(
    private http: HttpClient
  ) {}

  public createWarning(warning: WarningModel): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.API_URL}/Warning/CreateWarning`, warning);
  }

  public getAllWarnings(): Observable<ApiResponse<WarningModel[]>> {
    return this.http.get<ApiResponse<WarningModel[]>>(`${this.API_URL}/Warning/GetAllWarnings`);
  }
}