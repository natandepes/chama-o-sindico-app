import { Component } from '@angular/core';
import { CondominalManagerInfoService } from '../condominal-manager-contact-info.service';
import { CondominalManagerInfo } from '../models/condominal-manager-contact-info.model';

@Component({
  selector: 'app-view-condominal-manager-contact-info',
  standalone: false,
  templateUrl: './view-condominal-manager-contact-info.component.html',
  styleUrl: './view-condominal-manager-contact-info.component.css'
})
export class ViewCondominalManagerContactInfoComponent {
  protected condominalManagerInfo!: CondominalManagerInfo;

  constructor(private condominalManagerInfoService: CondominalManagerInfoService ) {}

  ngOnInit(): void {
    this.getCondominalManagerInfo();
  }

  private getCondominalManagerInfo(): void {
    this.condominalManagerInfo = this.condominalManagerInfoService.getCondominalManagerInfo();
  }

}
