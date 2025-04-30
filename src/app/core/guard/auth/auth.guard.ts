import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    if (!token || this.isTokenExpired(token)) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded:any = jwtDecode(token);
      const exp = decoded.exp;

      if(!exp) {
        return true;
      }

      const expiryDate = new Date(exp * 1000);
      return expiryDate < new Date();
    } catch (e) {
      return true; // Se não conseguir decodificar o token, consideramos que ele está expirados
    }
  }
}