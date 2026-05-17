import { AuthGuardService } from '../services/auth-guard.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const activateGuard: CanActivateFn = (route, state) => {
  // const router = inject(Router);
  // const cookieService = inject(CookieService);
  // const platformId = inject(PLATFORM_ID);
  const authGuardService = inject(AuthGuardService);

  // // If we are on the server/terminal during prerendering, return true.
  // // We cannot check browser cookies in a Node.js environment.
  // console.log('the platform is browser :' + isPlatformBrowser(platformId.toString()));
  // if (!isPlatformBrowser(platformId)) {
  //   return true;
  // }

  // // Execution reaches here ONLY in the browser
  // const isAccessTokenExists: boolean = cookieService.check('access_token');
  // const accessTokenValue: string = cookieService.get('access_token');
  // console.log('Browser - Access token exists:', isAccessTokenExists);
  // console.log('Browser - Access token value:', accessTokenValue);
  // if (isAccessTokenExists && accessTokenValue) {
  //   return true;
  // }
  // // Execution reaches here only if access token is not found
  // return router.createUrlTree(['access-denied']);

  return authGuardService.activation(route, state);
};
