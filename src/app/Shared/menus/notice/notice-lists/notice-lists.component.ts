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
  selector: 'app-notice-lists',
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
  templateUrl: './notice-lists.component.html',
  styleUrl: './notice-lists.component.scss',
})
export class NoticeListsComponent {
  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      caseCategory: ['1'],
    });
  }

  caseCategoryOptions = [
    { label: 'Draft Notice', value: '1' },
    { label: 'Final Notice', value: '2' },
  ];
}
