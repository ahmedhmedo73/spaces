import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { UsersReducer } from '../../store/users.reducers';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ feature: UsersReducer }), ButtonModule,ReactiveFormsModule],
      providers: [MessageService],
      declarations: [UserFormComponent],
    });
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
