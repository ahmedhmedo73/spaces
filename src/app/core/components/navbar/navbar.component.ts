import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setToken } from 'src/app/features/authentication/store/authentication.actions';
import { selectToken } from 'src/app/features/authentication/store/authentication.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLogin: boolean = false;
  subscriptionList: Subscription[] = [];
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.getToken();
  }
  getToken() {
    this.subscriptionList.push(
      this.store.select(selectToken).subscribe({
        next: (data) => {
          console.log(data);

          this.isLogin = !!data;
        },
      })
    );
  }
  logout(): void {
    this.store.dispatch(setToken({ token: '' }));
    this.router.navigateByUrl('/auth/login');

    console.log('lol');

    //remove cashe
    //@ts-ignore
    location.reload(true);
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
