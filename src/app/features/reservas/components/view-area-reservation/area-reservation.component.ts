import { Component, OnInit } from '@angular/core';
import { AreaReservationService } from '../../services/area-reservation.service';
import { AreaReservation } from '../../models/areaReservation.models';

@Component({
  selector: 'app-area-reservation',
  standalone: false,
  templateUrl: './area-reservation.component.html',
  styleUrls: ['./area-reservation.component.css']
})
export class AreaReservationComponent implements OnInit {

  previousAreaReservations: AreaReservation[] = [];
  nextAreaReservations: AreaReservation[] = [];

  constructor(private areaReservationService: AreaReservationService) {}

  ngOnInit() {
    this.getAreaReservations();
  }

  getAreaReservations() {
    this.areaReservationService.getAreaReservationsByUser(1).subscribe((data: AreaReservation[]) => {
      this.previousAreaReservations = data.filter(reservation => new Date(reservation.openTime) < new Date());
      this.nextAreaReservations = data.filter(reservation => new Date(reservation.openTime) >= new Date());
    });
  }

  getAreaReservation(id: number) {
    this.areaReservationService.getAreaReservation(id).subscribe((data: AreaReservation) => {
      console.log(data);
    });
  }
}
