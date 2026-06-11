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
  icon?: string; // Standard PrimeIcons token (e.g., 'pi pi-folder')
  children?: BarOptionItem[]; // Optional nested dropdown sub-items
  customMeta?: any; // Flexible payload pointer for API parsing
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
  // Removed the redundant 'change_password' element object tracking logic from here
  gstatViewOptions: BarOptionItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      id: 'listing',
      label: 'Listing',
      icon: 'pi pi-list',
      children: [{ id: 'inter_bench', label: 'Inter Bench' }],
    },
    {
      id: 'report',
      label: 'Report',
      icon: 'pi pi-file',
      children: [
        { id: 'case_docs', label: 'Case Docs' },
        { id: 'mis_report', label: 'Mis Reports' },
        {
          id: 'efiled_cases',
          label: 'Efiled Cases',
        },
        { id: 'case_status', label: 'Case Status' },
      ],
    },
    {
      id: 'cause_list',
      label: 'Causelist',
      icon: 'pi pi-calendar',
      children: [
        {
          id: 'final_causelist',
          label: 'Final CauseList',
        },
      ],
    },
    {
      id: 'order',
      label: 'Order',
      icon: 'pi pi-book',
      children: [
        {
          id: 'generate_order',
          label: 'Generate Order',
        },
        { id: 'upload_order', label: 'Upload Order' },
      ],
    },
    {
      id: 'transfer_case',
      label: 'Transfer Case',
      icon: 'pi pi-arrow-h',
      children: [
        {
          id: 'transfer_request',
          label: 'Transfer Request',
        },
        {
          id: 'transfer_action_taken',
          label: 'Transfer Action Taken',
        },
      ],
    },
    {
      id: 'recuse',
      label: 'Recuse',
      icon: 'pi pi-user-minus',
      children: [
        {
          id: 'recuse_judge_from_case',
          label: 'Recuse Judge(s) From Case',
        },
        {
          id: 'recused_cases',
          label: 'Recused Cases',
        },
      ],
    },
  ];

  // Handles user profile dropdown selections
  handleAccountActionEvent(actionType: string): void {
    if (actionType === 'change_password') {
      console.log(
        'Routing down to Change Password modal configuration views...',
      );
    } else if (actionType === 'logout') {
      console.log(
        'Clearing session tokens. Redirecting user stream back to Login gateway...',
      );
    }
  }

  handleBarSelectionEvent(event: {
    parent: BarOptionItem;
    child?: BarOptionItem;
  }): void {
    if (event.child) {
      console.log(
        `Triggering Sub-Option Endpoint: ${event.child.id} under parent ${event.parent.id}`,
      );
    } else {
      console.log(`Triggering Standard Option Endpoint: ${event.parent.id}`);
    }
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
