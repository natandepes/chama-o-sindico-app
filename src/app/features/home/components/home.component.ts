import { Component } from '@angular/core';
import { ROUTE_PATHS } from '../../../app.paths';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  routeTo(route: string): void {
    this.router.navigate([route]);
  }
}
