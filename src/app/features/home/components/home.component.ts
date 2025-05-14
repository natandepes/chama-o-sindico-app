import { Component } from '@angular/core';
import { ROUTE_PATHS } from '../../../app.paths';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  cards = [
    { icon: '/icons/DocumentIcon.svg', label: 'Documentos', route: ROUTE_PATHS.home },
    { icon: '/icons/MegaphoneIcon.svg', label: 'Denúncias', route: ROUTE_PATHS.listComplaints },
    { icon: '/icons/WorkIcon.svg', label: 'Serviços', route: ROUTE_PATHS.createCondominalService },
    { icon: '/icons/ChatIcon.svg', label: 'Fale com o Síndico', route: ROUTE_PATHS.contactInfo },
    { icon: '/icons/PoolIcon.svg', label: 'Reservas', route: ROUTE_PATHS.viewReservation },
    { icon: '/icons/BuildingIcon.svg', label: 'Edifício', route: ROUTE_PATHS.viewArea },
  ];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  routeTo(route: string): void {
    this.router.navigate([route]);
  }

  onViewProfile(): void {
    this.router.navigate([ROUTE_PATHS.personalInfo]);
  }

  onLogout(): void {
    this.authService.logout();
  }

  onClose(): void {
    window.close(); // Pode não funcionar em todos os navegadores, dependendo da origem da aba
  }
}
