import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComplaintComponent } from './components/create-complaint/create-complaint.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComplaintsComponent } from './components/list-complaints/list-complaints.component';
import { EditComplaintComponent } from './components/edit-complaint/edit-complaint.component';

@NgModule({
  declarations: [CreateComplaintComponent, ListComplaintsComponent, EditComplaintComponent],
  exports: [CreateComplaintComponent, ListComplaintsComponent, EditComplaintComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ComplaintModule {}
