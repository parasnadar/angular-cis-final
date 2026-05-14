import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../core/services/auth-service.service';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-memberpb',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    TagModule,
    ProgressBarModule,
    TooltipModule,
    MessageModule,
  ],
  templateUrl: './memberpb.component.html',
  styleUrl: './memberpb.component.scss',
})
export class MEMBERPBComponent {
  isDarkMode: boolean = false; // Track state

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const element = document.querySelector('html');

    if (this.isDarkMode) {
      element?.classList.add('my-app-dark');
    } else {
      element?.classList.remove('my-app-dark');
    }
  }
  public visible: boolean = false;
  public loadingValue: number = 0;

  constructor(private authService: AuthServiceService) {
    // Simulate a loading bar to test CSS transitions
    setInterval(() => {
      this.loadingValue = this.loadingValue >= 100 ? 0 : this.loadingValue + 10;
    }, 2000);
  }

  showDialog() {
    this.visible = true;
  }

  onLogout() {
    this.authService.logout();
  }
}
