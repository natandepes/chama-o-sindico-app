import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ResidentRegistrationModel } from '../models/resident-registration.model';
import { ApiResponse } from '../../../core/shared/api-response.model';
import { AuthResultModel } from '../models/auth-result.model';
import { LoginModel } from '../models/login.model';
import { UserRole } from '../models/user-roles.model';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = "http://localhost:5158/api";

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  public login(loginDto: LoginModel) : Observable<ApiResponse<AuthResultModel>> {
    return this.http.post<ApiResponse<AuthResultModel>>(`${this.API_URL}/Auth/LoginUser`, loginDto);
  }

  public register(registerDto: ResidentRegistrationModel) : Observable<ApiResponse<AuthResultModel>> {
    return this.http.post<ApiResponse<AuthResultModel>>(`${this.API_URL}/Auth/RegisterUser`, registerDto );
  }

  public deleteUser(userId: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.API_URL}/Auth/DeleteUser/${userId}`);
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public setUserInfo(name: string, userId: string): void {
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', userId);
  }
  
  public getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  public getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  private clearStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
  }

  public getUserRole(): UserRole | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);
      const roleStr = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      switch (roleStr) {
        case 'Resident':
          return UserRole.Resident;
        case 'CondominalManager':
          return UserRole.CondominalManager;
        default:
          return null;
      }
    } catch (e) {
      return null;
    }

  }

  public logout() : void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.post(`${this.API_URL}/Auth/LogoutUser`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .subscribe({
      next: () => {
        this.clearStorage();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
        // even if server fails, clear token client-side
        this.clearStorage();
        this.router.navigate(['/login']);
      }
    });
  }
}