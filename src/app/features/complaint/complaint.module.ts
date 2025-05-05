import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComplaintComponent } from './components/create-complaint/create-complaint.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComplaintsComponent } from './components/list-complaints/list-complaints.component';

@NgModule({
  declarations: [CreateComplaintComponent, ListComplaintsComponent],
  exports: [CreateComplaintComponent, ListComplaintsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ComplaintModule {}
