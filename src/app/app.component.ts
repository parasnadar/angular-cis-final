import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router = inject(Router);
  isLoginPage: boolean = true;
  title = 'Gstat-cis-2.0';

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // If the URL is exactly '/login' or the default empty path '/'
        this.isLoginPage =
          event.urlAfterRedirects === '/login' ||
          event.urlAfterRedirects === '/';
      });
  }
}
