import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token') || '';
  const cookieService: CookieService = inject(CookieService);
  const router: Router = inject(Router);
  const sharedService: SharedService = inject(SharedService);
  if (!token) {
    router.navigateByUrl('/auth/login');
    sharedService.show({
      severity: 'error',
      summary: 'Authentication',
      detail: 'Please log in',
    });
    return false;
  }
  return true;
};
