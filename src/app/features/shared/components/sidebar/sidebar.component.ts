import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isOpen = false;
  protected userName: string | null = null;

  constructor(
    private readonly sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.sidebarService.isOpen$.subscribe(open => {
      this.isOpen = open;
    });

    this.userName = this.authService.getUserName();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  protected logout(): void {
    this.authService.logout();
    this.toggleSidebar();
    this.userName = null;
  }

  protected goToProfile() {
    this.router.navigate(['/personal-info']);
  }
}
