import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private router: Router) {}
  handleLogin(role: string) {
    localStorage.setItem('userRole', role);
    this.router.navigate([`/${role}`]);
  }

  logout() {
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
