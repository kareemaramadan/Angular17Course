import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { activateGuard } from './activate-guard';

describe('activateguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => activateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
