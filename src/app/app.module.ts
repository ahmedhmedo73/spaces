import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationModule } from './features/authentication/authentication.module';

import { environment } from "src/app/core/environments/environment";
import { initializeApp } from 'firebase/app';
const app = initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent, NavbarComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ToastModule,
    AppRoutingModule,
    AuthenticationModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
  ],
  providers: [
    HttpClient,
    MessageService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
