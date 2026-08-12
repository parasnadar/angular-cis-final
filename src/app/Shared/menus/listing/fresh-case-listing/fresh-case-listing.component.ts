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

@Component({
  selector: 'app-fresh-case-listing',
  imports: [
    DynamicRadioGroupComponent,
    CommonModule,
    ReactiveFormsModule,
    DynamicRadioGroupComponent,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './fresh-case-listing.component.html',
  styleUrl: './fresh-case-listing.component.scss',
})
export class FreshCaseListingComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      caseCategory: ['1'],
      courtNo: ['1'],
      diaryFilingNo: [''],
      listingDate: [null],
      purpose: ['1'],
    });
  }

  caseCategoryOptions = [
    { label: 'Napa', value: '1' },
    { label: 'Appeal/Application', value: '2' },
  ];

  courtOption = [
    { label: 'Court I', value: '1' },
    { label: 'Court II', value: '2' },
    { label: 'Court III', value: '3' },
    { label: 'Court IV', value: '4' },
  ];

  purposeOption = [
    { label: 'Court I', value: '1' },
    { label: 'Court II', value: '2' },
    { label: 'Court III', value: '3' },
    { label: 'Court IV', value: '4' },
  ];

  onSearch(): void {
    console.log('Executing query payload:', this.form.value);
  }

  onReset(): void {
    this.form.patchValue({
      caseCategory: ['1'],
      courtNo: '1',
      diaryFilingNo: '',
      listingDate: null,
      purpose: '1',
    });
  }
}
