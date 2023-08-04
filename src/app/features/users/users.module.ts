import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersIndexComponent } from './pages/users-index/users-index.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { UsersIndexSekeletonComponent } from './components/users-index-sekeleton/users-index-sekeleton.component';


@NgModule({
  declarations: [
    UsersIndexComponent,
    UserDetailsComponent,
    UserFormComponent,
    UserDeleteComponent,
    UsersIndexSekeletonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
