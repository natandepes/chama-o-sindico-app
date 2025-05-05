import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { Vehicle } from '../../models/vehicles.model';

@Component({
  selector: 'app-view-vehicles',
  standalone: false,
  templateUrl: './view-vehicles.component.html',
  styleUrl: './view-vehicles.component.css'
})
export class ViewVehiclesComponent implements OnInit {

  constructor(private vehiclesService: VehiclesService) { }

  vehicles: Vehicle[] = [];
  searchText: string = '';

  ngOnInit(): void {
    this.getUserVehicles();
  }

  getAllVehicles() {
    this.vehiclesService.getAllVehicles().subscribe((response) => {
      console.log(response.data);
    })
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

  getUserVehicles() {
    this.vehiclesService.getUserVehicles().subscribe((response) => {
      this.vehicles = response.data!;
    })
  }

  deleteVehicle(id: string) {
    this.vehiclesService.deleteVehicle(id).subscribe((response) => {
      if (response.success) {
        alert('Veículo Deletado com Sucesso!');
        this.getUserVehicles();
      } else {
        alert('Erro ao Deletar o Veículo: ' + response.message);
      }
    }, (error) => {
      console.error('Error deleting vehicle:', error);
    });
  }

}
