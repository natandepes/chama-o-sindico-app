import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComplaintComponent } from './components/create-complaint/create-complaint.component';
import { ViewComplaintComponent } from './components/view-complaint/view-complaint.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateComplaintComponent, ViewComplaintComponent],
  exports: [CreateComplaintComponent, ViewComplaintComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ComplaintModule {}
