import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { MessageService } from 'primeng/api';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
