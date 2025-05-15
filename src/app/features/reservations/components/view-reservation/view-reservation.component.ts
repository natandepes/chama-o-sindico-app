import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { AreaReservationResponse } from '../../models/area-reservation-response.model';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-view-reservation',
  standalone: false,
  templateUrl: './view-reservation.component.html',
  styleUrl: './view-reservation.component.css',
})
export class ViewReservationComponent implements OnInit {
  previousAreaReservations: AreaReservationResponse[] = [];
  nextAreaReservations: AreaReservationResponse[] = [];
  searchText: string = '';
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;

  constructor(
    private areaReservationService: ReservationService,
    private authService: AuthService,
    private loader: LoaderService,
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();

    this.getAreaReservations();
  }

  private getAreaReservations() {
    if (this.userRole == this.UserRoleEnum.CondominalManager) {
      this.loader.show();
      this.areaReservationService.getAllAreaReservations().subscribe((data) => {
        this.previousAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) < new Date()) ?? [] as AreaReservationResponse[];
        this.nextAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) >= new Date()) ?? [] as AreaReservationResponse[];
        this.loader.hide();
      });
    }
    else {
      this.loader.show();
      this.areaReservationService.getUserAreaReservations().subscribe((data) => {
        this.previousAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) < new Date()) ?? [] as AreaReservationResponse[];
        this.nextAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) >= new Date()) ?? [] as AreaReservationResponse[];
        this.loader.hide();
      });
    }
  }

  filterPreviousReservations(){
    if(this.searchText){
      return this.previousAreaReservations.filter(reservation =>
        reservation.areaName.toUpperCase().includes(this.searchText.toUpperCase())
        || reservation.startDate.toString().includes(this.searchText.toUpperCase())
        || reservation.endDate.toString().includes(this.searchText.toUpperCase())
      );
    }

    return this.previousAreaReservations;
  }

  filterNextReservations(){
    if(this.searchText){
      return this.nextAreaReservations.filter(reservation =>
        reservation.areaName.toUpperCase().includes(this.searchText.toUpperCase())
        || reservation.startDate.toString().includes(this.searchText.toUpperCase())
        || reservation.endDate.toString().includes(this.searchText.toUpperCase())
      );
    }

    return this.nextAreaReservations;
  }

  deleteAreaReservation(id: string) {
    if (!confirm('Você tem certeza que deseja excluir esta reserva?')) {
      return;
    }

    this.loader.show();
    
    this.areaReservationService.deleteAreaReservation(id).subscribe(() => {
      this.loader.hide();
      this.getAreaReservations();
    });
  }

  extractDate(dateTime: Date | string): string {
    const dt = new Date(dateTime);
    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const year = dt.getFullYear();
    return `${day}/${month}/${year}`;
  }

  extractTime(dateTime: Date | string): string {
    const dt = new Date(dateTime);
    const hh = String(dt.getHours()).padStart(2, '0');
    const mm = String(dt.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  protected mapStatus(status: number): string {
    switch (status) {
      case 1: return 'Aguardando Aprovação';
      case 2: return 'Aprovada';
      case 3: return 'Rejeitada';
      default: return 'Desconhecido';
    }
  }
}
