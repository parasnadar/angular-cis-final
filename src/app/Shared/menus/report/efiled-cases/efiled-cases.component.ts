import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
export interface CaseRecord {
  diaryNo: string;
  caseDetails: string;
  location: string;
  status: 'Pending' | 'Scrutinized' | 'Defective';
  date: string;
}
@Component({
  selector: 'app-efiled-cases',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    TableModule,
    Select,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './efiled-cases.component.html',
  styleUrl: './efiled-cases.component.scss',
})
export class EfiledCasesComponent {
  constructor(private fb: FormBuilder) {}
  efiledform!: FormGroup;
  // Table Data Tracking Elements
  cases: CaseRecord[] = [];
  globalSearchText: string = '';

  // Entries To Display Settings
  selectedRowsCount: number = 5;
  rowsOptions = [
    { label: 'Show 5 entries', value: 5 },
    { label: 'Show 10 entries', value: 10 },
    { label: 'Show 25 entries', value: 25 },
    { label: 'Show 50 entries', value: 50 },
  ];
  benchOptions = [
    { label: 'All', value: '1' },
    { label: 'Delhi(PB)', value: '2' },
    { label: 'Patna', value: '3' },
    { label: 'Chandigarh', value: '4' },
    { label: 'Surat ', value: '5' },
    { label: 'Rajkot', value: '6' },
    { label: 'Shimla', value: '7' },
  ];

  caseTypeOptions = [
    { label: 'All', value: 'all' },
    { label: 'Appeal', value: 'a' },
    { label: 'Company Appeal', value: 'ca' },
    { label: 'Contempt Petition', value: 'cp' },
    { label: 'NAPA', value: 'NAPA' },
    { label: 'Transfer Application', value: 'cp' },
  ];

  dynamicOptions: { label: string; value: string }[] = [];

  ngOnInit(): void {
    this.efiledform = this.fb.group({
      bench: ['1'],
      caseType: ['all'],

      fromFilingDate: [null],
      toFilingDate: [null],
    });
    this.cases = [
      {
        diaryNo: '10245/2026',
        caseDetails: 'Appeal against Assessment Order',
        location: 'New Delhi (Principal Bench)',
        status: 'Pending',
        date: '28-06-2026',
      },
      {
        diaryNo: '10892/2026',
        caseDetails: 'Rectification of Clerical Error',
        location: 'Mumbai (Western Bench)',
        status: 'Defective',
        date: '25-06-2026',
      },
      {
        diaryNo: '11004/2026',
        caseDetails: 'Condonation of Delay Application',
        location: 'Chennai (Southern Bench)',
        status: 'Scrutinized',
        date: '29-06-2026',
      },
      {
        diaryNo: '11240/2026',
        caseDetails: 'Urgent Interlocutory Application',
        location: 'New Delhi (Principal Bench)',
        status: 'Pending',
        date: '30-06-2026',
      },
      {
        diaryNo: '11561/2026',
        caseDetails: 'Company Restructuring Appeal',
        location: 'Kolkata (Eastern Bench)',
        status: 'Scrutinized',
        date: '24-06-2026',
      },
      {
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',
        status: 'Defective',
        date: '18-06-2026',
      },
      {
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',
        status: 'Defective',
        date: '18-06-2026',
      },
      {
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',
        status: 'Defective',
        date: '18-06-2026',
      },
      {
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',
        status: 'Defective',
        date: '18-06-2026',
      },
      {
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',
        status: 'Defective',
        date: '18-06-2026',
      },
      {
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',
        status: 'Defective',
        date: '18-06-2026',
      },
      {
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',
        status: 'Defective',
        date: '18-06-2026',
      },
      {
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',
        status: 'Defective',
        date: '18-06-2026',
      },
      {
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',
        status: 'Defective',
        date: '18-06-2026',
      },
    ];
  }

  onViewRecord(record: CaseRecord): void {
    console.log(
      'Opening core workspace viewer channel for docket:',
      record.diaryNo,
    );
    alert(`Viewing Details for Docket System: ${record.diaryNo}`);
  }

  onSearch(): void {
    console.log('Executing query payload:', this.efiledform.value);
  }
}
