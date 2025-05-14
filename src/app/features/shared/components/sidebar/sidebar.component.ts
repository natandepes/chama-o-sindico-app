import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { ROUTE_PATHS } from '../../../../app.paths';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isOpen = false;
  protected userName: string | null = null;
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;

  constructor(
    private readonly sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.sidebarService.isOpen$.subscribe(open => {
      this.isOpen = open;
    });

    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
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
    this.router.navigate([ROUTE_PATHS.personalInfo]);
  }
  
  protected goToComplaints() {
    this.router.navigate([ROUTE_PATHS.listComplaints]);
  }

  protected goToReservations() {
    this.router.navigate([ROUTE_PATHS.viewReservation]);
  }

  protected goToAreas() {
    this.router.navigate([ROUTE_PATHS.viewArea]);
  }

  protected goToVehicles() {
    this.router.navigate([ROUTE_PATHS.viewVehicle]);
  }

  protected goToContactInfo() {
    this.router.navigate([ROUTE_PATHS.contactInfo]);
  }

  protected goToResidentsList() {
    this.router.navigate([ROUTE_PATHS.listResidents]);
  }
}
