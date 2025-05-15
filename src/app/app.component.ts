import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ROUTE_PATHS } from './app.paths';
import { SidebarService } from './features/shared/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnDestroy {
  shouldShowSidebar = false;
  isSidebarOpen = true;
  hiddenRoutes = [ROUTE_PATHS.login, ROUTE_PATHS.register, ROUTE_PATHS.home];

  private routerSubscription: Subscription;
  private sidebarSubscription: Subscription;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
  ) {
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.shouldShowSidebar = !this.hiddenRoutes.some(route => this.router.url.includes(route));
    });

    this.sidebarSubscription = this.sidebarService.isOpen$.subscribe(isOpen => (this.isSidebarOpen = isOpen));
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.sidebarSubscription.unsubscribe();
  }
}
