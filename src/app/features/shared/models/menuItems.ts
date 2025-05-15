import { ROUTE_PATHS } from '../../../app.paths';
import { UserRole } from '../../authentication/models/user-roles.model';

export interface MenuItem {
  icon: string;
  label: string;
  route: string;
  roles?: UserRole[]; // se quiser filtrar por roles
}

export const menuItems: MenuItem[] = [
  { icon: 'home', label: 'Home', route: ROUTE_PATHS.home },
  { icon: 'campaign', label: 'Denúncias', route: ROUTE_PATHS.listComplaints }, // roles: [UserRole.CondominalManager]
  { icon: 'engineering', label: 'Serviços', route: ROUTE_PATHS.createCondominalService },
  { icon: 'chat', label: 'Contato do Síndico', route: ROUTE_PATHS.contactInfo },
  { icon: 'event', label: 'Reservas', route: ROUTE_PATHS.viewReservation }, // roles: [UserRole.CondominalManager]
  { icon: 'location_city', label: 'Áreas', route: ROUTE_PATHS.viewArea }, // roles: [UserRole.Resident]
  { icon: 'directions_car', label: 'Veículos', route: ROUTE_PATHS.viewVehicle }, // roles: [UserRole.CondominalManager]
];
