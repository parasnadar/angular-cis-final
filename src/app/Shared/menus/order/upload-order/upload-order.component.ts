import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';

import { TableModule } from 'primeng/table';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
export interface CaseRecord {
  sNo: string;
  diaryNo: string;
  caseDetails: string;
  location: string;

  date: string;
}
@Component({
  selector: 'app-upload-order',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    Select,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './upload-order.component.html',
  styleUrl: './upload-order.component.scss',
})
export class UploadOrderComponent {
  constructor(private fb: FormBuilder) {}

  cases: CaseRecord[] = [];
  globalSearchText: string = '';

  selectedRowsCount: number = 5;
  rowsOptions = [
    { label: 'Show 5 entries', value: 5 },
    { label: 'Show 10 entries', value: 10 },
    { label: 'Show 25 entries', value: 25 },
    { label: 'Show 50 entries', value: 50 },
  ];

  ngOnInit(): void {
    this.cases = [
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
          'Prakash Cbic VS Designation, 201 Neeladri EC TNMAD 625001 , Soal trader',
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
      {
        sNo: '4',
        diaryNo: 'APL/49/PB/2025',
        caseDetails: 'RAKESH RANJAN PARIDA VS Manojd Dungriyal & Ors.',
        location: 'New Delhi (Principal Bench)',

        date: '30-06-2026',
      },
      {
        sNo: '5',
        diaryNo: 'APL/49/PB/2026',
        caseDetails:
          'RAKESH RANJAN PARIDA VS cs, delhi, Manojd Dungriyal & Ors.',
        location: 'Kolkata (Eastern Bench)',

        date: '24-06-2026',
      },
      {
        sNo: '6',
        diaryNo: '12099/2026',
        caseDetails:
          'RAKESH RANJAN PARIDA VS cs, Telangana, Manojd Dungriyal & Ors.',
        location: 'Lucknow (Central Bench)',

        date: '18-06-2026',
      },
      {
        sNo: '7',
        diaryNo: '12099/2026',
        caseDetails: 'Prakash Cbic VS RAKESH RANJAN PARIDA',
        location: 'Lucknow (Central Bench)',

        date: '18-06-2026',
      },
      {
        sNo: '8',
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',

        date: '18-06-2026',
      },
      {
        sNo: '9',
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',

        date: '18-06-2026',
      },
      {
        sNo: '10',
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',

        date: '18-06-2026',
      },
      {
        sNo: '11',
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',

        date: '18-06-2026',
      },
      {
        sNo: '12',
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',

        date: '18-06-2026',
      },
      {
        sNo: '13',
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',

        date: '18-06-2026',
      },
      {
        sNo: '14',
        diaryNo: '12099/2026',
        caseDetails: 'Stay Petition on Recovery',
        location: 'Lucknow (Central Bench)',

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
}
