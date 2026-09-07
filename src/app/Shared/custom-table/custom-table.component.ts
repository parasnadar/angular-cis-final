import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

export interface ColumnDef {
  field: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

// Action button / link config interface
export interface TableAction {
  label: string;
  icon?: string;
  url?: (row: any) => string; // External link ya dynamic URL ke liye
  action?: (row: any) => void; // Click handler ke liye
  target?: '_blank' | '_self';
}

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    Select,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
})
export class CustomTableComponent implements OnInit {
  /** Dynamic List of Columns */
  @Input() cols: ColumnDef[] = [];

  /** Dynamic Table Rows Data from API */
  @Input() data: any[] = [];

  /** Show/Hide Actions column */
  @Input() showActions: boolean = true;

  /** Show/Hide More Actions column */
  @Input() showMoreActions: boolean = false;

  /** Dynamic buttons/hyperlinks passed from parent */
  @Input() moreActions: TableAction[] = [];

  /** Action button event emitter */
  @Output() onView = new EventEmitter<any>();

  /** Custom Action click emitter */
  @Output() onCustomAction = new EventEmitter<{ action: string; row: any }>();

  globalSearchText: string = '';
  selectedRowsCount: number = 5;

  // Array of field names used for PrimeNG global filtering
  globalFilterFields: string[] = [];

  rowsOptions = [
    { label: 'Show 5 entries', value: 5 },
    { label: 'Show 10 entries', value: 10 },
    { label: 'Show 25 entries', value: 25 },
    { label: 'Show 50 entries', value: 50 },
  ];

  ngOnInit(): void {
    // 1. Fallback columns if none passed
    if (!this.cols || this.cols.length === 0) {
      this.cols = this.getDefaultColumns();
    }

    // 2. Fallback dummy data if none passed
    if (!this.data || this.data.length === 0) {
      this.data = this.getDefaultDummyData();
    }

    // 3. Extract field names automatically for global search
    this.globalFilterFields = this.cols.map((c) => c.field);
  }

  onViewRecord(item: any): void {
    this.onView.emit(item);
  }

  handleActionClick(action: TableAction, item: any, event: Event): void {
    if (action.action) {
      event.preventDefault();
      action.action(item);
    }
    this.onCustomAction.emit({ action: action.label, row: item });
  }

  /**
   * Safe property resolver to handle nested object keys (e.g., 'user.name')
   */
  getFieldValue(row: any, field: string): any {
    if (!field || !row) return '';
    return field.split('.').reduce((acc, part) => acc && acc[part], row);
  }

  private getDefaultColumns(): ColumnDef[] {
    return [
      { field: 'sNo', header: 'Sr. No.', width: '8%' },
      { field: 'diaryNo', header: 'Date Of Filing.' },
      { field: 'caseDetails', header: 'Case Type' },
      { field: 'location', header: 'Diary/Filing No.' },
      { field: 'date', header: 'Main Case Diary/Filing No.' },
      { field: 'TITLE', header: 'Title Of Case' },
      { field: 'CAT', header: 'Categories' },
    ];
  }

  private getDefaultDummyData(): any[] {
    return [
      {
        sNo: '1',
        diaryNo: '03/10/2025 02:22 PM',
        caseDetails: 'Appeal',
        location: '2025257101000009',
        date: 'NA',
        TITLE:
          'Abhi Shek Gstat VS RAKESH RANJAN PARIDA, Designation, 201 Neeladri EC TNMAD 625001',
        CAT: '1. Incorrect determination of value of supply of goods or services or both',
      },
      {
        sNo: '2',
        diaryNo: 'APL/50/PB/2026',
        caseDetails: 'Prakash Cbic VS Designation, 201 Neeladri EC',
        location: 'Mumbai (Western Bench)',
        date: '2025307201000182',
        TITLE:
          'Prakash Cbic VS RAKESH RANJAN PARIDA, Designation, 201 Neeladri EC TNMAD 625001  ',
        CAT: '1. Incorrect determination of value of supply of goods or services or both',
      },
    ];
  }
}
