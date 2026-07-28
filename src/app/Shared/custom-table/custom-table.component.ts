import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

export interface ColumnDef {
  field: string; // Object property key in API (e.g., 'diaryNo', 'caseDetails')
  header: string; // Column Title displayed in <th> (e.g., 'Case No.')
  width?: string; // Optional column width (e.g., '15%', '250px')
  align?: 'left' | 'center' | 'right'; // Optional alignment
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

  /** Action button event emitter */
  @Output() onView = new EventEmitter<any>();

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
      { field: 'diaryNo', header: 'Case No.', width: '18%' },
      { field: 'caseDetails', header: 'Party Detail', width: '35%' },
      { field: 'location', header: 'Location', width: '22%' },
      { field: 'date', header: 'Order Date', width: '17%' },
    ];
  }

  private getDefaultDummyData(): any[] {
    return [
      {
        sNo: '1',
        diaryNo: 'APL/49/PB/2026',
        caseDetails: 'RAKESH RANJAN PARIDA VS BM, BANGALORE',
        location: 'New Delhi (Principal Bench)',
        date: '28-06-2026',
      },
      {
        sNo: '2',
        diaryNo: 'APL/50/PB/2026',
        caseDetails: 'Prakash Cbic VS Designation, 201 Neeladri EC',
        location: 'Mumbai (Western Bench)',
        date: '25-06-2026',
      },
    ];
  }
}
