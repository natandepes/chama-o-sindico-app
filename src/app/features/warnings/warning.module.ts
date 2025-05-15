import { NgModule } from "@angular/core";
import { CreateWarningComponent } from "./components/create-warning/create-warning.component";
import { ViewWarningsComponent } from './components/view-warnings/view-warnings.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@NgModule({
  declarations: [CreateWarningComponent, ViewWarningsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink, 
    FormsModule
  ],
  exports: [CreateWarningComponent, ViewWarningsComponent]
})
export class WarningModule {}