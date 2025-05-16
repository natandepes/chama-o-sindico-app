import { NgModule } from "@angular/core";
import { PersonalInfoComponent } from "./components/personal-info/personal-info.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ResidentListComponent } from "./components/resident-list/resident-list.component";
import { RouterLink } from "@angular/router";

@NgModule({
  declarations: [
    PersonalInfoComponent,
    ResidentListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  exports: [
    PersonalInfoComponent,
    ResidentListComponent
  ]
})
export class PersonalInfoModule {}