import { Component, OnInit } from '@angular/core';
import { AreaReservationService } from '../../services/area-reservation.service';

@Component({
  selector: 'app-area-reservation',
  standalone: false,
  templateUrl: './area-reservation.component.html',
  styleUrls: ['./area-reservation.component.css']
})
export class AreaReservationComponent implements OnInit {

  areaReservations: object[] = [];

  constructor(private areaReservationService: AreaReservationService) {}

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
