import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { AreaReservationResponse } from '../../models/area-reservation-response.model';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();

    this.getAreaReservations();
  }

  private getAreaReservations() {
    if (this.userRole == this.UserRoleEnum.CondominalManager) {
      this.areaReservationService.getAllAreaReservations().subscribe((data) => {
        this.previousAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) < new Date()) ?? [] as AreaReservationResponse[];
        this.nextAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) >= new Date()) ?? [] as AreaReservationResponse[];
      });
    }
    else {
      this.areaReservationService.getUserAreaReservations().subscribe((data) => {
        this.previousAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) < new Date()) ?? [] as AreaReservationResponse[];
        this.nextAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) >= new Date()) ?? [] as AreaReservationResponse[];
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
    this.areaReservationService.deleteAreaReservation(id).subscribe(() => {
      alert('Reservation deleted successfully!');
      this.getAreaReservations(); // Refresh the list after deletion
    });
  }

  extractDate(dateTime: Date | string): string {
    const dt = new Date(dateTime);
    return dt.toISOString().split('T')[0].replace(/-/g, '/');
  }

  extractTime(dateTime: Date | string): string {
    const dt = new Date(dateTime);
    const hh = String(dt.getHours()).padStart(2, '0');
    const mm = String(dt.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }
}
