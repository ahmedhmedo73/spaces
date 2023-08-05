import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationReducer } from './store/authentication.reducers';
import { AuthenticationEffects } from './store/authentication.effects';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('auth', AuthenticationReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
    AuthenticationRoutingModule,
  ],
})
export class AuthenticationModule {}
