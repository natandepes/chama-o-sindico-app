import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { UserRole } from '../../../authentication/models/user-roles.model';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-form-vehicles',
  standalone: false,
  templateUrl: './form-vehicles.component.html',
  styleUrl: './form-vehicles.component.css'
})
export class FormVehiclesComponent implements OnInit {
  formulario!: FormGroup;
  vehicleId!: string;
  selectedImg: File | null = null;
  previewImg: string | null = null;
  protected userRole: UserRole | null = null;
  protected readonly UserRoleEnum = UserRole;

  constructor(
    private vehiclesService: VehiclesService,
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
  private authService: AuthService
  ) {
    this.formulario = new FormGroup({
      model: new FormControl('', Validators.required),
      vehicleType: new FormControl('', Validators.required),
      licensePlate: new FormControl('', Validators.required),
      vehicleImage: new FormControl('', Validators.required),
      imageType: new FormControl('', Validators.required),
      carSpace: new FormControl(null, Validators.required),
      createdByUserId: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.vehicleId = this.route.snapshot.paramMap.get('id')!;
    if (this.vehicleId) {
      this.getVehicleById();
    }
  }

  openImgSelector(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files?.[0]) {
      this.processImg(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.processImg(file);
    }
  }

  processImg(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImg = reader.result as string;
      this.selectedImg = file;
      this.formulario.patchValue({
        vehicleImage: this.previewImg,
        imageType: file.type,
      });
    };
    reader.readAsDataURL(file);
  }

  removeImg(): void {
    this.selectedImg = null;
    this.previewImg = null;
    this.formulario.patchValue({ vehicleImage: '', imageType: '' });
  }

  saveVehicle(): void {
    if (this.vehicleId) {
      this.formulario.value.id = this.vehicleId;
    }

    if (this.formulario.valid) {
      this.loader.show();
      this.vehiclesService.saveVehicle(this.formulario.value).subscribe((response) => {
        this.loader.hide();
        if (response.success) {
          this.formulario.reset();
          this.removeImg();
          this.router.navigate(['/vehicles/view']);
        } else {
          alert('Erro ao criar veículo. Por favor, tente novamente mais tarde.');
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  }

  getVehicleById(): void {
    this.loader.show();
    this.vehiclesService.getVehicleById(this.vehicleId).subscribe((response) => {
      this.loader.hide();
      if (response.success) {
        const vehicle = response.data!;
        vehicle.vehicleType = vehicle.vehicleType.toLowerCase();
        this.previewImg = vehicle.vehicleImage;
        this.formulario.patchValue(vehicle);
      } else {
        alert("Erro ao carregar os dados do veículo. Por favor, tente novamente mais tarde.");
      }
    });
  }
}