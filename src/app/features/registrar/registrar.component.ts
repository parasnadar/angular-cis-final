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
  delta: string[];
  secondaryText: string;
  toneClass:
    | 'tone-oceanic'
    | 'tone-sunburst'
    | 'tone-neon-emerald'
    | 'tone-electric-crimson'
    | 'tone-deep-purple'
    | 'tone-electric-cyan';
  iconClass: string;
  actionTarget: string;
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
    this.metricsDataList = [
      {
        id: 'c1',
        tag: 'Case Number Generation',
        count: 100,
        delta: ['+12% Delta', 'Instant Run'],
        secondaryText: 'Awaiting automatic indexing routine',
        toneClass: 'tone-oceanic',
        iconClass: 'pi-cog',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c2',
        tag: 'Refiled Cases Log',
        count: 32,
        delta: ['+8% Growth', 'Checked'],
        secondaryText: 'Resubmitted petitions pending verification',
        toneClass: 'tone-electric-cyan',
        iconClass: 'pi-replay',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c3',
        tag: 'For Defect Notice',
        count: 41,
        delta: ['Action Required', 'High Priority'],
        secondaryText: 'Validation failures flagged by system scrutiny',
        toneClass: 'tone-sunburst',
        iconClass: 'pi-file-excel',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c4',
        tag: 'Action Due Ledgers',
        count: 142,
        delta: ['24h Deadline', 'Review Required'],
        secondaryText: 'Statutory compliance limits approaching',
        toneClass: 'tone-deep-purple',
        iconClass: 'pi-list',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c5',
        tag: 'Appeals for First Listing',
        count: 38,
        delta: ['14 Overdue', 'Urgent Action'],
        secondaryText: 'Requires definitive order bench assignments',
        toneClass: 'tone-sunburst',
        iconClass: 'pi-sort-alt',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c6',
        tag: 'Applications for First Listing',
        count: 150,
        delta: ['Sync Ready', 'Rosters Live'],
        secondaryText: 'Verified records locked for automated rosters',
        toneClass: 'tone-neon-emerald',
        iconClass: 'pi-check-square',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c7',
        tag: 'Unscheduled Listing Pool',
        count: 9,
        delta: ['Critical Load', 'Escalated'],
        secondaryText: 'Immediate court clearance sequence requested',
        toneClass: 'tone-electric-crimson',
        iconClass: 'pi-bolt',
        isCritical: true,
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c8',
        tag: 'Draft Notices Validation',
        count: 18,
        delta: ['Pending Release', '9 Drafts'],
        secondaryText: 'Automated legal notices awaiting signature validation',
        toneClass: 'tone-deep-purple',
        iconClass: 'pi-envelope',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c9',
        tag: 'Pending Proceeding Transcripts',
        count: 7,
        delta: ['Steno Syncing', 'In Review'],
        secondaryText: 'Daily hearing notes awaiting final review log',
        toneClass: 'tone-electric-cyan',
        iconClass: 'pi-hourglass',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c10',
        tag: 'Draft Cause List Verification',
        count: 11,
        delta: ['Benches Ready', 'Locked'],
        secondaryText: 'Proposed daily schedule matrix preview generated',
        toneClass: 'tone-neon-emerald',
        iconClass: 'pi-table',
        actionTarget: 'fresh_cases',
      },
      {
        id: 'c11',
        tag: 'Inter-Bench Case Transfers',
        count: 4,
        delta: ['External Sync', 'Approval Needed'],
        secondaryText: 'Cross-bench transfer requests requiring authorization',
        toneClass: 'tone-electric-crimson',
        iconClass: 'pi-arrows-h',
        isCritical: true,
        actionTarget: 'fresh_cases',
      },
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
    { id: 'registrarhome', label: 'Dashboard', icon: 'pi pi-objects-column' },
    // {
    //   id: 'dashboard',
    //   label: 'Dashboard',
    //   icon: 'pi pi-objects-column',
    // },
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

  handleCardNavigation(targetView: string): void {
    if (!targetView) return;

    this.activeView = targetView;
    console.log(
      `Command Center moving pipeline layout stream to: ${targetView}`,
    );

    // Optional: Trigger a success notification banner drop here if needed
  }
}
