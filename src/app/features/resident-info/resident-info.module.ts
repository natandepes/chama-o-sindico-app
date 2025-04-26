import { NgModule } from "@angular/core";
import { PersonalInfoComponent } from "./components/personal-info/personal-info.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PersonalInfoComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  exports: [
    PersonalInfoComponent
  ]
})
export class ResidentInfoModule {}