import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-vehicles',
  standalone: false,
  templateUrl: './form-vehicles.component.html',
  styleUrl: './form-vehicles.component.css'
})
export class FormVehiclesComponent implements OnInit {

    formulario!: FormGroup
    vehicleId!: string;

    constructor(private vehiclesService: VehiclesService, private route: ActivatedRoute, private router: Router) {   
      this.formulario = new FormGroup({
        model: new FormControl('', Validators.required),
        vehicleType: new FormControl('', Validators.required),
        licensePlate: new FormControl('', Validators.required),
        vehicleImage: new FormControl('', Validators.required),
        imageType: new FormControl('', Validators.required),
        carSpace: new FormControl(null, Validators.required),
      });
    }

    ngOnInit(): void {
      this.vehicleId = this.route.snapshot.paramMap.get('id')!;

      if(this.vehicleId){
        this.getVehicleById();
      }
    }

    saveVehicle() {
      if(this.vehicleId){
        this.formulario.value.id = this.vehicleId;
      }

      console.log(this.formulario.value);

      if(this.formulario.valid){
        this.vehiclesService.saveVehicle(this.formulario.value).subscribe((response) => {
          if (response.success) {
            this.router.navigate(['/vehicles/view']);
          } else {
            alert('Erro ao Salvar o Veículo: ' + response.message);
          }
        }, (error) => {
          console.error('Error saving vehicle:', error);
        });
      }
      else {
        alert('Preencha todos os campos obrigatórios!');
      }
    }

    onFileSelected(evt: Event) {
      const input = evt.target as HTMLInputElement;
      if (!input.files?.length) return;
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // reader.result será algo como "data:image/png;base64,iVBORw0KG..."
        this.formulario.patchValue({ vehicleImage: reader.result as string, imageType: file.type });
      };
      reader.readAsDataURL(file);
    }

    getVehicleById() {
      this.vehiclesService.getVehicleById(this.vehicleId).subscribe((response) => {
        if (response.success) {
          const vehicle = response.data!;
          vehicle.vehicleType = vehicle.vehicleType.toLowerCase();
          this.formulario.patchValue(vehicle);
        } else {
          console.error('Error fetching vehicle data:', response.message);
        }
      }, (error) => {
        console.error('Error fetching vehicle data:', error);
      });
    }
}
