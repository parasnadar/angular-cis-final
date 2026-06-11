import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';

export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string; // Optional standard PrimeIcons tokens string target (ex: 'pi pi-folder')
  count?: number; // Optional data tracking counters overlay value
  customMeta?: any; // Flexible payload pointer for API parsing logic integration downstream
}

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
    SkeletonModule,
    UtilityBarComponent,
  ],
  templateUrl: './memberpb.component.html',
  styleUrl: './memberpb.component.scss',
})
export class MEMBERPBComponent {
  caseTrackerOptions: BarOptionItem[] = [
    { id: 'all', label: 'All Cases', icon: 'pi pi-briefcase', count: 142 },
    {
      id: 'pending',
      label: 'Pending Scrutiny',
      icon: 'pi pi-clock',
      count: 18,
    },
    {
      id: 'allocated',
      label: 'Allocated Benches',
      icon: 'pi pi-calendar-plus',
    },
    {
      id: 'disposed',
      label: 'Disposed',
      icon: 'pi pi-check-circle',
      count: 84,
    },
  ];

  handleBarSelectionEvent(event: {
    index: number;
    payload: BarOptionItem;
  }): void {
    console.log(
      `Loading metrics pipeline dataset matching context target: ${event.payload.id}`,
    );
    // Your actual API endpoint reload logic goes straight here...
  }

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
