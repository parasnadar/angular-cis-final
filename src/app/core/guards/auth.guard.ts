import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('userRole');

  // 1. If no role exists, they aren't logged in
  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Security Check: Does the stored role match the path they are trying to access?
  // This prevents a 'steno' user from manually typing '/superadmin'
  const requestedPath = route.routeConfig?.path;

  if (userRole === requestedPath || userRole === 'superadmin') {
    return true;
  }

  // 3. Unauthorized access
  router.navigate(['/login']);
  return false;
};
