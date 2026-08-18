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
  selector: 'app-display-board',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './display-board.component.html',
  styleUrl: './display-board.component.scss',
})
export class DisplayBoardComponent {
  constructor(private fb: FormBuilder) {}
  orderReport!: FormGroup;

  ngOnInit(): void {
    this.orderReport = this.fb.group({
      courtNo: ['1', Validators.required],

      noticeTime: [null, Validators.required],
    });
  }

  courtOption = [
    { label: 'Court I', value: '1' },
    { label: 'Court II', value: '2' },
    { label: 'Court III', value: '3' },
    { label: 'Court IV', value: '4' },
    { label: 'Registrar Court', value: '4' },
  ];

  onSearch(): void {
    console.log('Executing query payload:', this.orderReport.value);

    if (this.orderReport.invalid) {
      this.orderReport.markAllAsTouched();
      return;
    }

    // Execute backend posting operations here. Then reset gracefully:
    this.orderReport.reset();
  }

  onReset(): void {
    this.orderReport.reset({
      courtNo: '1',

      noticeTime: null,
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.orderReport.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
