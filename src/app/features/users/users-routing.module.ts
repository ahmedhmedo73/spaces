import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersIndexComponent } from './pages/users-index/users-index.component';

const routes: Routes = [
  {
    path: '',
    component: UsersIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
