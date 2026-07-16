import { Component, OnInit, Type } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';
import { ChangePasswordModalComponent } from '../../Shared/change-password-modal/change-password-modal.component';
import { MENU_REGISTRY } from '../../core/menu-registry';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';

export interface ChromaMetricCard {
  id: string;
  tag: string;
  count: number;
  delta: string;
  secondaryText: string;
  toneClass: 'tone-oceanic' | 'tone-sunburst' | 'tone-neon-emerald' | 'tone-electric-crimson';
  iconClass: string;
  isCritical?: boolean;
}
export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string;
  children?: BarOptionItem[];
  customMeta?: any;
}
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    CommonModule,
    UtilityBarComponent,
    ChangePasswordModalComponent,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss',
})
export class REGISTRARComponent implements OnInit {
  activeDisplayMode: 'grid' | 'visual' = 'grid';

  // Master Data Stream Container Array
  metricsDataList: ChromaMetricCard[] = [];

  ngOnInit(): void {
    this.fetchTribunalMetricsPayload();
  }

  fetchTribunalMetricsPayload(): void {
    // Array configuration mapping values down securely from backend payload loops
    this.metricsDataList = [
      {
        id: 'c1',
        tag: 'Case no generation',
        count: 1,
        delta: '+12% Delta',
        secondaryText: 'Awaiting Scrutiny Allocation',
        toneClass: 'tone-oceanic',
        iconClass: 'pi-folder-open'
      },
      {
        id: 'c2',
        tag: 'Refiled Cases',
        count: 32,
        delta: '+12% Delta',
        secondaryText: 'Awaiting Scrutiny Allocation',
        toneClass: 'tone-oceanic',
        iconClass: 'pi-folder-open'
      },
      {
        id: 'c3',
        tag: 'For Defect Notice',
        count: 41,
        delta: '+12% Delta',
        secondaryText: 'Awaiting Scrutiny Allocation',
        toneClass: 'tone-oceanic',
        iconClass: 'pi-folder-open'
      },
      {
        id: 'c4',
        tag: 'Action Due',
        count: 142,
        delta: '+12% Delta',
        secondaryText: 'Awaiting Scrutiny Allocation',
        toneClass: 'tone-oceanic',
        iconClass: 'pi-folder-open'
      },
      {
        id: 'c5',
        tag: 'Appeal for first listing',
        count: 38,
        delta: '14 Overdue',
        secondaryText: 'Requires Rejection Sign-off',
        toneClass: 'tone-sunburst',
        iconClass: 'pi-exclamation-triangle'
      },
      {
        id: 'c6',
        tag: 'Application for first listing',
        count: 604,
        delta: 'Sync Ready',
        secondaryText: 'Ready for Cause List Matrix',
        toneClass: 'tone-neon-emerald',
        iconClass: 'pi-verified'
      },
      {
        id: 'c7',
        tag: 'Unscheduled Listing',
        count: 9,
        delta: 'Critical Load',
        secondaryText: 'Immediate Court Escalation',
        toneClass: 'tone-electric-crimson',
        iconClass: 'pi-bolt',
        isCritical: true
      },
      {
        id: 'c8',
        tag: 'Draft Notices',
        count: 9,
        delta: 'Critical Load',
        secondaryText: 'Immediate Court Escalation',
        toneClass: 'tone-electric-crimson',
        iconClass: 'pi-bolt',
        isCritical: true
      },
      {
        id: 'c9',
        tag: 'Pending Proceeding',
        count: 9,
        delta: 'Critical Load',
        secondaryText: 'Immediate Court Escalation',
        toneClass: 'tone-electric-crimson',
        iconClass: 'pi-bolt',
        isCritical: true
      },
      {
        id: 'c10',
        tag: 'Draft Cause List',
        count: 9,
        delta: 'Critical Load',
        secondaryText: 'Immediate Court Escalation',
        toneClass: 'tone-electric-crimson',
        iconClass: 'pi-bolt',
        isCritical: true
      },
      {
        id: 'c11',
        tag: 'Transfer Cases Request From Other Benches',
        count: 9,
        delta: 'Critical Load',
        secondaryText: 'Immediate Court Escalation',
        toneClass: 'tone-electric-crimson',
        iconClass: 'pi-bolt',
        isCritical: true
      }
    ];
  }

  setDisplayMode(mode: 'grid' | 'visual'): void {
    this.activeDisplayMode = mode;
  }
  constructor(private authService: AuthServiceService) {}
  isPasswordModalVisible: boolean = false;
  public visible: boolean = false;
  loggedInUser = {
    name: 'Registrar',
    initials: 'R',
  };
  activeView: string = 'registrarhome';
  activeComponentType: Type<any> | null = null;
  gstatViewOptions: BarOptionItem[] = [
    { id: 'registrarhome', label: 'Home', icon: 'pi pi-home' },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'pi pi-objects-column',
    },
    {
      id: 'bench',
      label: 'Bench',
      icon: 'pi pi-hammer',
      children: [
        { id: 'create_bench', label: 'Create Bench' },
        { id: 'view_bench', label: 'View Bench' },
      ],
    },
    {
      id: 'listing',
      label: 'Listing',
      icon: 'pi pi-list',
      children: [
        { id: 'fresh_case_listing', label: 'Fresh Case Listing' },
        { id: 'old_case_listing', label: 'Old Case Listing' },
        { id: 'inter_bench', label: 'Inter Bench' },
      ],
    },
    {
      id: 'report',
      label: 'Report',
      icon: 'pi pi-file',
      children: [
        { id: 'order_report', label: 'Order Report' },
        { id: 'mis_report', label: 'Mis Reports' },
        { id: 'finilized_cause_list', label: 'Finalized Causelist Calendar' },
        { id: 'efiled_cases', label: 'Efiled Cases' },
        { id: 'accepted', label: 'APL 02A Part B Accepted' },
        { id: 'date_wise_pendency', label: 'Date-wise pendency' },
        { id: 'rejected', label: 'APL 02A Part B Rejected' },
        { id: 'court_wise_pendency', label: 'Court-wise pendency' },
        { id: 'proceeding_calender', label: 'Proceeding Calender' },
        { id: 'case_status', label: 'Case Status' },
        { id: 'notification_report', label: 'Notification Report' },
      ],
    },

    {
      id: 'proceeding',
      label: 'Proceeding',
      icon: 'pi pi-history',
      children: [
        { id: 'case_proceeding', label: 'Case Proceeding' },
        { id: 'unscheduled_listing', label: 'Unscheduled Listing' },
      ],
    },
    {
      id: 'cause_list',
      label: 'Causelist',
      icon: 'pi pi-calendar',
      children: [
        { id: 'draft_causelist', label: 'Draft Causelist' },
        { id: 'final_causelist', label: 'Final Causelist' },
      ],
    },
    {
      id: 'order',
      label: 'Order',
      icon: 'pi pi-book',
      children: [
        { id: 'generate_order', label: 'Generate Order' },
        { id: 'upload_order', label: 'Upload Order' },
      ],
    },
    {
      id: 'notice',
      label: 'Notice',
      icon: 'pi pi-megaphone',
      children: [
        { id: 'create_notice', label: 'Create Notice' },
        { id: 'notice_lists', label: 'Notice Lists' },
      ],
    },
  ];

  handleAccountActionEvent(actionType: string): void {
    if (actionType === 'change_password') {
      this.isPasswordModalVisible = true;
    } else if (actionType === 'logout') {
      this.authService.logout();
    }
  }
  onPasswordUpdateSaved(payload: any): void {
    console.log(
      'Parent received valid payload. Ready for HTTP request pipeline:',
      payload,
    );
    // Execute backend API post operations here:
    // this.authService.changePassword(payload.username, payload.oldPassword, payload.newPassword).subscribe(...);
  }

  handleBarSelectionEvent(event: {
    parent: BarOptionItem;
    child?: BarOptionItem;
  }): void {
    const selectedId = event.child
      ? (event.child.id as string)
      : (event.parent.id as string);
    this.activeView = selectedId;

    // Dynamically look up the component type using the string ID from MENU_REGISTRY
    if (selectedId === 'registrarhome') {
      this.activeComponentType = null;
    } else {
      this.activeComponentType = MENU_REGISTRY[selectedId] || null;
    }
  }
}
