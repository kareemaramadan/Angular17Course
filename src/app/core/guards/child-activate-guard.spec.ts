import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { childActivateGuard } from './child-activate-guard';

describe('childActivateGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => childActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
