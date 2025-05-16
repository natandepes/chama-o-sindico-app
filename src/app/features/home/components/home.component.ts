import { Component } from '@angular/core';
import { ROUTE_PATHS } from '../../../app.paths';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service';
import { MenuItem, menuItems } from '../../shared/models/menuItems';
import { UserRole } from '../../authentication/models/user-roles.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected cards: MenuItem[] = menuItems.filter(item => item.route !== ROUTE_PATHS.home);
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;
  protected readonly ROUTE_PATHS = ROUTE_PATHS;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.userRole = this.authService.getUserRole();
  }

  routeTo(route: string): void {
    this.router.navigate([route]);
  }

  onLogout(): void {
    this.authService.logout();
  }

  protected isVisible(item: MenuItem): boolean {
    if (!item.roles) return true;
    return item.roles.includes(this.userRole as UserRole);
  }
}
