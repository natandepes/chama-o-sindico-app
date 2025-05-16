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
  { icon: 'campaign', label: 'Denúncias', route: ROUTE_PATHS.listComplaints },
  { icon: 'engineering', label: 'Serviços', route: ROUTE_PATHS.listCondominalService },
  { icon: 'chat', label: 'Contato do Síndico', route: ROUTE_PATHS.contactInfo, roles: [UserRole.Resident] },
  { icon: 'event', label: 'Reservas', route: ROUTE_PATHS.viewReservation },
  { icon: 'location_city', label: 'Áreas', route: ROUTE_PATHS.viewArea, roles: [UserRole.CondominalManager] },
  { icon: 'directions_car', label: 'Veículos', route: ROUTE_PATHS.viewVehicle },
  { icon: 'people', label: 'Moradores', route: ROUTE_PATHS.listResidents, roles: [UserRole.CondominalManager] },
  { icon: 'notifications', label: 'Avisos', route: ROUTE_PATHS.viewWarnings },
];
