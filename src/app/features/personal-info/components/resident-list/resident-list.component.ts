import { Component } from '@angular/core';
import { ViewPersonalInfoModel } from '../../models/view-personal-info.model';
import { ResidentService } from '../../services/resident.service';
import { AuthService } from '../../../authentication/services/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadResidents();
  }

  protected loadResidents() {
    this.residentService.getAllResidents().subscribe({
      next: (response) => {
        if (response.success) {
          this.residentsList = response.data ?? [] as ViewPersonalInfoModel[];
        }
      }
    });
  }

  protected deleteResident(userId: string) {
    if (confirm("Tem certeza que deseja excluir este morador?")) {
      this.authService.deleteUser(userId).subscribe({
        next: (response) => {
          if (response.success) {
            alert("Morador excluído com sucesso!");
            this.loadResidents();
          } else {
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
