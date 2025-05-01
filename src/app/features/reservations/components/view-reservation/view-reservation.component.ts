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
  areaReservations: AreaReservation[] = [];

  constructor(private areaReservationService: ReservationService) {}

  ngOnInit() {
    this.getAreaReservations();
  }

  getAreaReservations() {
    this.areaReservationService.getAreaReservations().subscribe((data) => {
      this.areaReservations = data.data ?? [] as AreaReservation[];
    });
  }

  getAreaReservation(id: string) {
    this.areaReservationService.getAreaReservation(id).subscribe((data) => {
      console.log(data);
    });
  }
}
