import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../app.paths';
import { CondominalService } from '../../models/condominal-service.model';
import { CondominalServicesService } from '../../services/condominal-services.service';

@Component({
  selector: 'app-list-condominal-services',
  standalone: false,
  templateUrl: './list-condominal-services.component.html',
  styleUrl: './list-condominal-services.component.css'
})
export class ListCondominalServicesComponent implements OnInit {

  services: Array<CondominalService> = [];

  constructor(private router: Router, private condominalServiceService: CondominalServicesService) { }
  
  ngOnInit(): void {
    this.getAllCondominalServices();
  }

  goToCreateService(){
    this.router.navigate([ROUTE_PATHS.createCondominalService]);
  }

  goToEditService(id: string){
    this.router.navigate(['condominal-service/edit/', id]);
  }

  getAllCondominalServices(){
    this.condominalServiceService.getAllCondominalServices().subscribe({
      next: (response) => {
        this.services = response.data!;
      },
      error: (error) => {
        console.error('Error fetching condominal services:', error);
      }
    });
  }


}
