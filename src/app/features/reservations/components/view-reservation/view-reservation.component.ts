import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { AreaReservation } from '../../models/area-reservation.model';

@Component({
  selector: 'app-view-reservation',
  standalone: false,
  templateUrl: './view-reservation.component.html',
  styleUrl: './view-reservation.component.css',
})
export class ViewReservationComponent implements OnInit {
  previousAreaReservations: AreaReservation[] = [];
  nextAreaReservations: AreaReservation[] = [];
  searchText: string = '';

  constructor(private areaReservationService: ReservationService) {}

  ngOnInit() {
    this.getUserAreaReservations();
  }

  getUserAreaReservations() {
    const userId = localStorage.getItem('userId')!; 

    this.areaReservationService.getUserAreaReservations(userId).subscribe((data) => {
      this.previousAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) < new Date()) ?? [] as AreaReservation[];
      this.nextAreaReservations = data.data?.filter(reservation => new Date(reservation.endDate) >= new Date()) ?? [] as AreaReservation[];
    });
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
    console.log(this.searchText);
    if(this.searchText){
      return this.nextAreaReservations.filter(reservation =>
        reservation.areaName.toUpperCase().includes(this.searchText.toUpperCase())
        || reservation.startDate.toString().includes(this.searchText.toUpperCase())
        || reservation.endDate.toString().includes(this.searchText.toUpperCase())
      );
    }

    return this.nextAreaReservations;
  }

  // getAreaReservation(id: string) {
  //   this.areaReservationService.getAreaReservation(id).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  deleteAreaReservation(id: string) {
    this.areaReservationService.deleteAreaReservation(id).subscribe(() => {
      alert('Reservation deleted successfully!');
      this.getUserAreaReservations(); // Refresh the list after deletion
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
