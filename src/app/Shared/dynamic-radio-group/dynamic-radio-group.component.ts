import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { RadioButton } from 'primeng/radiobutton';

export interface RadioOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-dynamic-radio-group',
  standalone: true,
  imports: [CommonModule, RadioButton, ReactiveFormsModule, FormsModule],
  templateUrl: './dynamic-radio-group.component.html',
  styleUrl: './dynamic-radio-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicRadioGroupComponent),
      multi: true,
    },
  ],
})
export class DynamicRadioGroupComponent implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() groupName: string = 'dynamicGroup';
  @Input() minWidthPx: number = 200; // Customizable column breakpoint size

  selectedValue: any = null;
  disabled: boolean = false;

  // ControlValueAccessor Boilerplate Pipeline connections
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onModelChange(value: any): void {
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
  }
}
