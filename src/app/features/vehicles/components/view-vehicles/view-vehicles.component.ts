import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { Vehicle } from '../../models/vehicles.model';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-view-vehicles',
  standalone: false,
  templateUrl: './view-vehicles.component.html',
  styleUrl: './view-vehicles.component.css'
})
export class ViewVehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  searchText: string = '';
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;
  
  constructor(
    private vehiclesService: VehiclesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.getVehicles();
  }


  filterVehicles() {
    if(this.searchText){
      return this.vehicles.filter((vehicle) => {
        return vehicle.model.toUpperCase().includes(this.searchText.toUpperCase()) 
        || 
        vehicle.licensePlate.toUpperCase().includes(this.searchText.toUpperCase())
        ||
        vehicle.carSpace.toString().includes(this.searchText)
      })
    }
    return this.vehicles;
  }

  private getVehicles() {
    if (this.userRole == this.UserRoleEnum.CondominalManager) {
      this.vehiclesService.getAllVehicles().subscribe((response) => {
        this.vehicles = response.data!;
      });
    } else {
      this.vehiclesService.getUserVehicles().subscribe((response) => {
        this.vehicles = response.data!;
      });
    }
  }

  deleteVehicle(id: string) {
    this.vehiclesService.deleteVehicle(id).subscribe((response) => {
      if (response.success) {
        alert('Veículo Deletado com Sucesso!');
        this.getVehicles();
      } else {
        alert("Erro ao deletar veículo. Por favor, tente novamente mais tarde.");
      }
    }, (error) => {
      console.error("Erro ao deletar veículo. Por favor, tente novamente mais tarde.");
    });
  }

}
