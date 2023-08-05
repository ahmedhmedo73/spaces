import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersIndexComponent } from './users-index.component';
import { SkeletonModule } from 'primeng/skeleton';
import { StoreModule } from '@ngrx/store';
import { UsersReducer } from '../../store/users.reducers';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';
import { DialogModule } from 'primeng/dialog';
import { UsersIndexSekeletonComponent } from '../../components/users-index-sekeleton/users-index-sekeleton.component';

describe('UsersIndexComponent', () => {
  let component: UsersIndexComponent;
  let fixture: ComponentFixture<UsersIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ feature: UsersReducer }),DialogModule,SkeletonModule],
      declarations: [UsersIndexComponent,UserDetailsComponent,UsersIndexSekeletonComponent]
    });
    fixture = TestBed.createComponent(UsersIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
