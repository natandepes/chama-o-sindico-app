import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../app.paths';
import { CondominalService } from '../../models/condominal-service.model';
import { CondominalServicesService } from '../../services/condominal-services.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { UserRole } from '../../../authentication/models/user-roles.model';

@Component({
  selector: 'app-list-condominal-services',
  standalone: false,
  templateUrl: './list-condominal-services.component.html',
  styleUrl: './list-condominal-services.component.scss',
})
export class ListCondominalServicesComponent implements OnInit {
  services: Array<CondominalService> = [];
  searchText: string = '';
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;

  constructor(
    private router: Router,
    private condominalServiceService: CondominalServicesService,
    private loader: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
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
    this.loader.show();
    this.condominalServiceService.getAllCondominalServices().subscribe({
      next: response => {
        this.services = response.data!;
        this.loader.hide();
      },
      error: error => {
        this.loader.hide();
        alert('Erro ao buscar os serviços. Tente novamente mais tarde.');
      },
    });
  }

  deleteService(id: string) {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) {
      return;
    }

    this.loader.show();

    this.condominalServiceService.deleteService(id).subscribe({
      next: response => {
        if (response.success) {
          this.loader.hide();
          this.getAllCondominalServices();
        } else {
          this.loader.hide();
          alert('Erro ao excluir o serviço. Tente novamente mais tarde.');
        }
      }
    });
  }
}
