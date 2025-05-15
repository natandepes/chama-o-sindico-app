import { Component } from '@angular/core';
import { ROUTE_PATHS } from '../../../app.paths';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service';
import { MenuItem, menuItems } from '../../shared/models/menuItems';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected cards: MenuItem[] = menuItems.filter(item => item.route !== ROUTE_PATHS.home);
  protected readonly ROUTE_PATHS = ROUTE_PATHS;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  routeTo(route: string): void {
    this.router.navigate([route]);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
