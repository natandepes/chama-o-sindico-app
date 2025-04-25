import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://sua-api.com/auth'; // Substitua pela sua URL de API

  constructor(private http: HttpClient) {}

  login(userName: string, userPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userName, userPassword }).pipe(
      tap((response: any) => {
        // Armazene o token JWT ou outras informações de sessão
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}