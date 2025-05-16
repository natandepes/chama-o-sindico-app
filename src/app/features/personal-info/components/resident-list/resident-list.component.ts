import { Component } from '@angular/core';
import { ViewPersonalInfoModel } from '../../models/view-personal-info.model';
import { ResidentService } from '../../services/resident.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-resident-list',
  standalone: false,
  templateUrl: './resident-list.component.html',
  styleUrl: './resident-list.component.css'
})
export class ResidentListComponent {
  protected residentsList!: ViewPersonalInfoModel[];
  protected searchText: string = '';

  constructor(
    private residentService: ResidentService,
    private authService: AuthService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.loadResidents();
  }

  protected loadResidents() {
    this.loader.show();
    this.residentService.getAllResidents().subscribe({
      next: (response) => {
        if (response.success) {
          this.residentsList = response.data ?? [] as ViewPersonalInfoModel[];
          this.loader.hide();
        }
        else {
          this.loader.hide();
          alert("Um erro ocorreu ao buscar os moradores. Tente novamente mais tarde.");
        }
      }
    });
  }

  protected deleteResident(userId: string) {
    if (confirm("Tem certeza que deseja excluir este morador?")) {
      this.loader.show();
      this.authService.deleteUser(userId).subscribe({
        next: (response) => {
          if (response.success) {
            this.loader.hide();
            this.loadResidents();
          } else {
            this.loader.hide();
            alert("Erro ao excluir morador. Por favor, tente novamente.");
          }
        }
      });
    }
  }

  protected filterResidents() {
    if(this.searchText){
      return this.residentsList.filter((resident) => {
        return resident.name.toUpperCase().includes(this.searchText.toUpperCase()) 
        || 
        resident.email.toUpperCase().includes(this.searchText.toUpperCase())
        ||
        resident.phone.toString().includes(this.searchText)
        ||
        resident.apartmentNumber.toString().includes(this.searchText)
      })
    }
    return this.residentsList;
  }
}
