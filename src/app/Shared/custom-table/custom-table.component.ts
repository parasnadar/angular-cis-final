import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

export interface CaseRecord {
  sNo: string;
  diaryNo: string;
  caseDetails: string;
  location: string;
  date: string;
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
  // Input array from parent component
  @Input() data: CaseRecord[] = [];

  // Output event emitted when user clicks "View" button
  @Output() onView = new EventEmitter<CaseRecord>();

  globalSearchText: string = '';
  selectedRowsCount: number = 5;

  rowsOptions = [
    { label: 'Show 5 entries', value: 5 },
    { label: 'Show 10 entries', value: 10 },
    { label: 'Show 25 entries', value: 25 },
    { label: 'Show 50 entries', value: 50 },
  ];

  ngOnInit(): void {
    // If no dynamic data is passed from parent, use local dummy fallback
    if (!this.data || this.data.length === 0) {
      this.data = this.getFallbackDummyData();
    }
  }

  onViewRecord(item: CaseRecord): void {
    this.onView.emit(item);
  }

  private getFallbackDummyData(): CaseRecord[] {
    return [
      {
        sNo: '1',
        diaryNo: 'APL/49/PB/2026',
        caseDetails: 'RAKESH RANJAN PARIDA VS BM, BANGALORE, Saurabh & Ors.',
        location: 'New Delhi (Principal Bench)',
        date: '28-06-2026',
      },
      {
        sNo: '2',
        diaryNo: 'APL/50/PB/2026',
        caseDetails:
          'Prakash Cbic VS Designation, 201 Neeladri EC TNMAD 625001',
        location: 'Mumbai (Western Bench)',
        date: '25-06-2026',
      },
      {
        sNo: '3',
        diaryNo: 'APL/419/PB/2026',
        caseDetails: 'RAKESH RANJAN PARIDA VS Prakash Cbic & Ors.',
        location: 'Chennai (Southern Bench)',
        date: '29-06-2026',
      },
    ];
  }
}
