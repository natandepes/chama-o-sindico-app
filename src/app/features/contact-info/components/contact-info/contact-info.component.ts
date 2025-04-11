import { Component } from '@angular/core';
import { ContactInfo } from '../../models/contact-info';
import { ContactInfoService } from '../../services/contact-info.service';

@Component({
  selector: 'contact-info',
  standalone: false,
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent {
  protected condominalManagerInfo!: ContactInfo;

  constructor(private contactInfoService: ContactInfoService ) {}

  ngOnInit(): void {
    this.getCondominalManagerInfo();
  }

  private getCondominalManagerInfo(): void {
    this.condominalManagerInfo = this.contactInfoService.getCondominalManagerInfo();
  }

}
