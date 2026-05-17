import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { PrimeNG, providePrimeNG } from 'primeng/config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes)), providePrimeNG({ ripple: true })],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
