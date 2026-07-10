import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicRadioGroupComponent } from '../../../dynamic-radio-group/dynamic-radio-group.component';
@Component({
  selector: 'app-transfer-action-taken',
  imports: [
    CommonModule,

    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    DynamicRadioGroupComponent,
  ],
  templateUrl: './transfer-action-taken.component.html',
  styleUrl: './transfer-action-taken.component.scss',
})
export class TransferActionTakenComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  transferActionOptions = [
    { label: 'PB to State', value: '1' },
    { label: 'State to State(Intra) to State', value: '2' },
    { label: 'State to State(Inter)', value: '3' },
    { label: 'State to PB', value: '4' },
  ];
  ngOnInit(): void {
    this.form = this.fb.group({
      TransferCategory: ['1'],
    });
  }
}
