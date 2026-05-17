import { CanDeactivateFn } from '@angular/router';
import { IDeactivate } from '../Interfaces/ideactivate';

export const deactivateGuard: CanDeactivateFn<IDeactivate> = (
  component: IDeactivate,
  currentRoute,
  currentState,
  nextState,
) => {
  return component.canExit();
};
