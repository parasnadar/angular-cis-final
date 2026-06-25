import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-defect_notices',
  imports: [
    CommonModule,

    ReactiveFormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './defect-notices.component.html',
  styleUrl: './defect-notices.component.scss',
})
export class DefectNoticesComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  showOption = [
    { label: '10', value: '10' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
    { label: '200  ', value: '200' },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      show: ['10'],
      diaryFilingNo: [''],
      fromFilingDate: [null],
      toFilingDate: [null],
      diaryKeyword: [''],
    });
  }

  onSearch(): void {
    console.log('Executing query payload:', this.form.value);
  }

  onReset(): void {
    this.form.patchValue({
      show: '10',
      diaryFilingNo: '',
      fromFilingDate: null,
      toFilingDate: null,
      diaryKeyword: '',
    });
  }
}
