import { Component } from '@angular/core';
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
@Component({
  selector: 'app-proceeding-calender',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './proceeding-calender.component.html',
  styleUrl: './proceeding-calender.component.scss',
})
export class ProceedingCalenderComponent {
  constructor(private fb: FormBuilder) {}
  orderReport!: FormGroup;

  ngOnInit(): void {
    this.orderReport = this.fb.group({
      courtNo: ['1'],
      toDate: [null],
      fromDate: [null],
    });
  }

  courtOption = [
    { label: 'All Court', value: '5' },
    { label: 'Court I', value: '1' },
    { label: 'Court II', value: '2' },
    { label: 'Court III', value: '3' },
    { label: 'Court IV', value: '4' },
  ];

  onSearch(): void {
    console.log('Executing query payload:', this.orderReport.value);
  }

  onReset(): void {
    this.orderReport.patchValue({
      courtNo: '1',
      fromDate: null,
      toDate: null,
    });
  }
}
