import { CanMatchFn } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { inject } from '@angular/core';

export const matchGuard: CanMatchFn = (route, segments) => {
  const authGuardService = inject(AuthGuardService);
  return authGuardService.Match(route, segments);
};
