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
  selector: 'app-date-wise-pendency',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './date-wise-pendency.component.html',
  styleUrl: './date-wise-pendency.component.scss',
})
export class DateWisePendencyComponent {
  constructor(private fb: FormBuilder) {}
  dateWisePendency!: FormGroup;

  ngOnInit(): void {
    this.dateWisePendency = this.fb.group({
      date_type: ['1'],
      user: ['1'],
    });
  }

  date_type_Option = [
    { label: 'Fresh Cases', value: '1' },
    { label: 'Refiled Cases', value: '2' },
    { label: 'Return Cases', value: '3' },
  ];

  user_Option = [
    { label: 'Paras Kumar(arbp1)', value: '1' },
    { label: 'kumar sah (registrar)', value: '2' },
    { label: 'To-be Self Assigned', value: '3' },
  ];

  onSearch(): void {
    console.log('Executing query payload:', this.dateWisePendency.value);
  }

  onReset(): void {
    this.dateWisePendency.patchValue({
      date_type: '1',
      user: '1',
    });
  }
}
