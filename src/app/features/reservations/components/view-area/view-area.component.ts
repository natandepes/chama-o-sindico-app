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
  searchText: string = '';

  constructor(private areaReservationService: ReservationService) {}
  

  ngOnInit() {
    this.getAreas();
  }

  filterAreas() {
    if (this.searchText) {
      return this.areas.filter(area =>
        area.name.toUpperCase().includes(this.searchText.toUpperCase())
        || area.description.toUpperCase().includes(this.searchText.toUpperCase())
      );
    }
    return this.areas;
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
