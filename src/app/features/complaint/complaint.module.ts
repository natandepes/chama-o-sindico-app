import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComplaintComponent } from './components/create-complaint/create-complaint.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComplaintsComponent } from './components/list-complaints/list-complaints.component';
import { RouterModule } from '@angular/router';
import { ViewComplaintComponent } from './components/view-complaint/view-complaint.component';

@NgModule({
  declarations: [CreateComplaintComponent, ListComplaintsComponent, ViewComplaintComponent],
  exports: [CreateComplaintComponent, ListComplaintsComponent, ViewComplaintComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class ComplaintModule {}
