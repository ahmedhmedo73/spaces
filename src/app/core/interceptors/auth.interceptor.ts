import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string = localStorage.getItem('token') || '';
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token != null) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.token),
      });
    }

    return next.handle(request);
  }
}
