import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  routes: string[] = [];
  subscriptionList: Subscription[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.handleRoutingChange();
  }
  handleRoutingChange() {
    this.subscriptionList.push(
      this.router.events
        .pipe(filter((router: any) => router instanceof NavigationEnd))
        .subscribe({
          next: (response: any) => {
            this.routes = response.url.split('/');
            this.routes.shift();
          },
          error: (error) => {},
        })
    );
  }
  showBreadcrumb(): boolean {
    return !this.routes.includes('auth');
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
