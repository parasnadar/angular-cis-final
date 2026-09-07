import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

export interface ScrutinyColumnDef {
  field: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

@Component({
  selector: 'app-scrutiny-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    Select,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './scrutiny-table.component.html',
  styleUrl: './scrutiny-table.component.scss',
})
export class ScrutinyTableComponent implements OnInit {
  @ContentChild('caseDetailsTemplate') caseDetailsTemplate!: TemplateRef<any>;
  @Input() getRowClass: (row: any) => string = () => '';
  @Input() cols: ScrutinyColumnDef[] = [];
  @Input() data: any[] = [];

  // Slots passed from parent: Scrutiny or ARB
  @ContentChild('diaryTemplate') diaryTemplate!: TemplateRef<any>;
  @ContentChild('actionTemplate') actionTemplate!: TemplateRef<any>;

  globalSearchText: string = '';
  selectedRowsCount: number = 10;
  globalFilterFields: string[] = [];

  rowsOptions = [
    { label: 'Show 5 entries', value: 5 },
    { label: 'Show 10 entries', value: 10 },
    { label: 'Show 25 entries', value: 25 },
    { label: 'Show 50 entries', value: 50 },
  ];

  ngOnInit(): void {
    if (!this.cols || this.cols.length === 0) {
      this.cols = this.getDefaultColumns();
    }
    this.globalFilterFields = this.cols.map((c) => c.field);
  }

  getFieldValue(row: any, field: string): any {
    if (!field || !row) return '';
    return field.split('.').reduce((acc, part) => acc && acc[part], row);
  }

  private getDefaultColumns(): ScrutinyColumnDef[] {
    return [
      { field: 'sNo', header: 'Sr. No.', width: '6%' },
      { field: 'diaryNo', header: 'Date Of Filing.', width: '12%' },
      { field: 'caseDetails', header: 'Case Type', width: '12%' },
      { field: 'location', header: 'Diary/Filing No.', width: '18%' },
      { field: 'date', header: 'Main Case Diary/Filing No.', width: '14%' },
      { field: 'TITLE', header: 'Title Of Case', width: '20%' },
      { field: 'CAT', header: 'Categories', width: '15%' },
      { field: 'Action', header: 'Action', width: '16%', align: 'center' },
    ];
  }
}
