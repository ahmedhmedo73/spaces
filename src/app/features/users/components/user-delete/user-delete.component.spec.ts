import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteComponent } from './user-delete.component';
import { Store, StoreModule } from '@ngrx/store';
import { UsersReducer } from '../../store/users.reducers';

describe('UserDeleteComponent', () => {
  let component: UserDeleteComponent;
  let fixture: ComponentFixture<UserDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ feature: UsersReducer })],
      declarations: [UserDeleteComponent],
    });
    fixture = TestBed.createComponent(UserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
