import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-view-area',
  standalone: false,
  templateUrl: './view-area.component.html',
  styleUrl: './view-area.component.css'
})
export class ViewAreaComponent implements OnInit{

  areas: Area[] = [];

  constructor(private areaReservationService: ReservationService) {}
  

  ngOnInit() {
    this.getAreas();
  }

  getAreas() {
    this.areaReservationService.getAreas().subscribe((data) => {
      this.areas = data.data ?? [] as Area[];
    });
  }

  deleteArea(id: string) {
    this.areaReservationService.deleteArea(id).subscribe(() => {
      this.getAreas();
    });
  }
}
