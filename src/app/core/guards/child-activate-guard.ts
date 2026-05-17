import { CanActivateChildFn } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { inject } from '@angular/core/primitives/di';

export const childActivateGuard: CanActivateChildFn = (childRoute, state) => {
  const authGuardService = inject(AuthGuardService);
  return authGuardService.activation(childRoute, state);
};
