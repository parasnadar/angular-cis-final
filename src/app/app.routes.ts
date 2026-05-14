import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'arbp',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/arbp/arbp.component').then((m) => m.ARBPComponent),
  },

  {
    path: 'memberpb',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/memberpb/memberpb.component').then(
        (m) => m.MEMBERPBComponent,
      ),
  },

  {
    path: 'registrar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/registrar/registrar.component').then(
        (m) => m.REGISTRARComponent,
      ),
  },

  {
    path: 'scrunity',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/scrunity/scrunity.component').then(
        (m) => m.SCRUNITYComponent,
      ),
  },

  {
    path: 'steno',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/steno/steno.component').then((m) => m.STENOComponent),
  },

  {
    path: 'superadmin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/superadmin/superadmin.component').then(
        (m) => m.SUPERADMINComponent,
      ),
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }, // Wildcard route for 404 handling
];
