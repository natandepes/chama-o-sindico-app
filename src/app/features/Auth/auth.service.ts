import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = "http://localhost:5158/api";

  constructor(private http: HttpClient, private router: Router) { }

  public login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/Auth/LoginUser`, { email, password });
  }

  public register(email: string, password: string, role: string) {
    return this.http.post(`${this.API_URL}/Auth/RegisterUser`, { email, password, role });
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public isLoggedIn() {
    return !!this.getToken();
  }

  public logout() {
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
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
        // even if server fails, clear token client-side
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }
}
