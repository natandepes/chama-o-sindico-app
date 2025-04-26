import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-view-reservation',
  standalone: false,
  templateUrl: './view-reservation.component.html',
  styleUrl: './view-reservation.component.css',
})
export class ViewReservationComponent implements OnInit {
  areaReservations: object[] = [];

  constructor(private areaReservationService: ReservationService) {}

  ngOnInit() {
    this.getAreaReservations();
  }

  getAreaReservations() {
    this.areaReservationService.getAreaReservations(1).subscribe((data: object[]) => {
      this.areaReservations = data;
    });
  }

  getAreaReservation(id: number) {
    this.areaReservationService.getAreaReservation(id).subscribe((data: object[]) => {
      console.log(data);
    });
  }
}
