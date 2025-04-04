import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isOpen = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isOpen$.subscribe(open => {
      this.isOpen = open;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}