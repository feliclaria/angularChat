import { TestBed } from '@angular/core/testing';

import { AuthErrorMessageService } from './auth-error-message.service';

describe('AuthErrorMessageService', () => {
  let service: AuthErrorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
