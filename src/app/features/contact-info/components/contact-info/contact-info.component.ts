import { Component } from '@angular/core';
import { ContactInfo } from '../../models/contact-info';
import { ContactInfoService } from '../../services/contact-info.service';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'contact-info',
  standalone: false,
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent {
  protected condominalManagerInfo!: ContactInfo;

  constructor(private contactInfoService: ContactInfoService, private loader: LoaderService ) {}

  ngOnInit(): void {
    this.getCondominalManagerInfo();
  }

  private getCondominalManagerInfo(): void {
    this.loader.show();
    this.contactInfoService.getCondominalManagerInfo().subscribe(
      (response) => {
        if (response.success) {
          this.condominalManagerInfo = response.data!;
          this.loader.hide();
        } else {
          this.loader.hide();
          alert("Um erro ocorreu ao buscar as informações do síndico. Tente novamente mais tarde.");
        }
      }
    );
  }

}
