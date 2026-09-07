import { Component } from '@angular/core';
import { DynamicRadioGroupComponent } from '../../../dynamic-radio-group/dynamic-radio-group.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import {
  CustomTableComponent,
  ColumnDef,
  TableAction,
} from '../../../custom-table/custom-table.component';

@Component({
  selector: 'app-notice-lists',
  imports: [
    DynamicRadioGroupComponent,
    CommonModule,
    ReactiveFormsModule,
    DynamicRadioGroupComponent,
    CustomTableComponent,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './notice-lists.component.html',
  styleUrl: './notice-lists.component.scss',
})
export class NoticeListsComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadApiData();
    this.form = this.fb.group({
      caseCategory: ['1'],
    });
  }

  caseCategoryOptions = [
    { label: 'Draft Notice', value: '1' },
    { label: 'Final Notice', value: '2' },
  ];

  caseRecords: any[] = [];
  tableColumns: ColumnDef[] = [
    { field: 'sNo', header: 'Sr. No.' },
    { field: 'oldFiling', header: 'Notice Type' },
    { field: 'newFiling', header: 'Notice Id' },
    { field: 'causeTitle', header: 'Case No' },
    { field: 'from', header: 'Date Of notice' },
  ];

  loadApiData(): void {
    // Example: Fetching from your API service
    // this.apiService.getCases().subscribe((response) => {
    //   this.caseRecords = response.data;
    // });

    // Dummy fallback for testing
    this.caseRecords = [
      {
        sNo: '1',
        oldFiling: 'Specific Notice',
        newFiling: 'GSTAT/PB//00033/2025',
        causeTitle: 'APL/2/PB/2025',
        from: '17/12/2025',
      },
    ];
  }
  handleRecordView(selectedRow: any): void {
    console.log('Selected case for viewing:', selectedRow);
    alert(`Opening details for case: ${selectedRow.diaryNo}`);
  }

  customActions: TableAction[] = [
    {
      label: 'View Document',
      icon: 'pi pi-external-link',
      url: (row) => `https://example.com/cases/${row.location}/pdf`,
      target: '_blank',
    },
    {
      label: 'View Draft',
      icon: 'pi pi-external-link',
      url: (row) => `https://example.com/cases/${row.location}/pdf`,
      target: '_blank',
    },
    {
      label: 'Approve',
      icon: 'pi pi-external-link',
      url: (row) => `https://example.com/cases/${row.location}/pdf`,
      target: '_blank',
    },
    {
      label: 'Delete',
      icon: 'pi pi-external-link',
      url: (row) => `https://example.com/cases/${row.location}/pdf`,
      target: '_blank',
    },
  ];
}
