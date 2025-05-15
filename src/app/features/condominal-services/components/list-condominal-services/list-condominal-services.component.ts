import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../app.paths';
import { CondominalService } from '../../models/condominal-service.model';
import { CondominalServicesService } from '../../services/condominal-services.service';

@Component({
  selector: 'app-list-condominal-services',
  standalone: false,
  templateUrl: './list-condominal-services.component.html',
  styleUrl: './list-condominal-services.component.scss',
})
export class ListCondominalServicesComponent implements OnInit {
  services: Array<CondominalService> = [];
  searchText: string = '';

  constructor(
    private router: Router,
    private condominalServiceService: CondominalServicesService,
  ) {}

  ngOnInit(): void {
    this.getAllCondominalServices();
  }

  filterServices() {
    return this.services.filter(service => {
      return (
        service.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        service.providerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        service.cellphone.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }

  goToCreateService() {
    this.router.navigate([ROUTE_PATHS.createCondominalService]);
  }

  goToEditService(id: string) {
    this.router.navigate(['condominal-service/edit/', id]);
  }

  getAllCondominalServices() {
    this.condominalServiceService.getAllCondominalServices().subscribe({
      next: response => {
        this.services = response.data!;
      },
      error: error => {
        console.error('Error fetching condominal services:', error);
      },
    });
  }

  deleteService(id: string) {
    this.condominalServiceService.deleteService(id).subscribe({
      next: response => {
        if (response.success) {
          alert('Serviço excluído com sucesso!');
          this.getAllCondominalServices();
        } else {
          console.error('Error deleting service:', response.message);
        }
      },
      error: error => {
        console.error('Error deleting service:', error);
      },
    });
  }
}
