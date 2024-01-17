import { CanActivateFn } from '@angular/router';

export const routingGuard: CanActivateFn = (route, state) => {
  return true;
};
