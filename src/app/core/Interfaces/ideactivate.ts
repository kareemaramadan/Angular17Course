import { GuardResult, MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';

export interface IDeactivate {
  canExit: () => MaybeAsync<GuardResult>;
}
