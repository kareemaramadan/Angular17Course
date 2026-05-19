import { Routes, CanActivateFn } from '@angular/router';
import { activateGuard } from './core/guards/activate-guard';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { deactivateGuard } from './core/guards/deactivate-guard';
import { childActivateGuard } from './core/guards/child-activate-guard';
import { matchGuard } from './core/guards/match-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/authentication/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
        canDeactivate: [deactivateGuard],
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/authentication/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'access-denied',
        loadComponent: () =>
          import('./pages/authentication/access-denied/access-denied').then((c) => c.AccessDenied),
      },
    ],
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./layouts/user-layout/user-layout.component').then((c) => c.UserLayoutComponent),
    canActivate: [activateGuard],
    canActivateChild: [childActivateGuard],
    canMatch: [matchGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/webApp/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((c) => c.Cart),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then((c) => c.Products),
      },
      {
        path: 'details',
        loadComponent: () => import('./pages/details/details').then((c) => c.Details),
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/category/category').then((c) => c.Category),
      },
    ],
  },
];
