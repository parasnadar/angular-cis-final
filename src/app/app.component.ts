import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastData, ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Gstat-cis-2.0';
  // Create an observable to be used with the async pipe in the template
  toast$: Observable<ToastData | null>;
  isClosing = false;

  constructor(
    private toastService: ToastService,
    private router: Router,
  ) {
    this.toast$ = this.toastService.toastState.asObservable();
  }

  closeToast() {
    this.isClosing = true;
    setTimeout(() => {
      this.toastService.toastState.next(null);

      // 3. Reset the flag for the next toast
      this.isClosing = false;
    }, 500);
  }
}
