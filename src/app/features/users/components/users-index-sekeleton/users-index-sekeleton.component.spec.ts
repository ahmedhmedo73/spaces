import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersIndexSekeletonComponent } from './users-index-sekeleton.component';
import { SkeletonModule } from 'primeng/skeleton';

describe('UsersIndexSekeletonComponent', () => {
  let component: UsersIndexSekeletonComponent;
  let fixture: ComponentFixture<UsersIndexSekeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports :[SkeletonModule],
      declarations: [UsersIndexSekeletonComponent]
    });
    fixture = TestBed.createComponent(UsersIndexSekeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
