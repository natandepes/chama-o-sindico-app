import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Area } from '../../models/area.model';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-view-area',
  standalone: false,
  templateUrl: './view-area.component.html',
  styleUrl: './view-area.component.css'
})
export class ViewAreaComponent implements OnInit{

  areas: Area[] = [];
  searchText: string = '';

  constructor(private areaReservationService: ReservationService, private loader: LoaderService) {}
  

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
    this.loader.show();
    this.areaReservationService.getAreas().subscribe((data) => {
      this.areas = data.data ?? [] as Area[];
      this.loader.hide();
    });
  }

  deleteArea(id: string) {
    if (!confirm('Você tem certeza que deseja excluir esta área?')) {
      return;
    }

    this.loader.show();

    this.areaReservationService.deleteArea(id).subscribe({
      next: (data) => {
        if (data.success) {
          this.loader.hide();
          this.getAreas();
        }
        else {
          this.loader.hide();
          alert('Erro ao excluir a área. Por favor, tente novamente mais tarde.');
        }
      }
    })
  }
}
