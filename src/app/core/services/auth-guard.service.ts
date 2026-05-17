import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  MaybeAsync,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  activation(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.authentication();
  }
  Match(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.authentication();
  }

  authentication(): MaybeAsync<GuardResult> {
    const router = inject(Router);
    const cookieService = inject(CookieService);
    const platformId = inject(PLATFORM_ID);

    // If we are on the server/terminal during prerendering, return true.
    // We cannot check browser cookies in a Node.js environment.
    console.log('the platform is browser :' + isPlatformBrowser(platformId.toString()));
    if (!isPlatformBrowser(platformId)) {
      //return true;
      console.log('Server - Access token check skipped');
    }

    // Execution reaches here ONLY in the browser
    const isAccessTokenExists: boolean = cookieService.check('access_token');
    const accessTokenValue: string = cookieService.get('access_token');
    console.log('Browser - Access token exists:', isAccessTokenExists);
    console.log('Browser - Access token value:', accessTokenValue);
    if (isAccessTokenExists && accessTokenValue) {
      return true;
    }
    // Execution reaches here only if access token is not found
    return router.createUrlTree(['access-denied']);
  }
}
