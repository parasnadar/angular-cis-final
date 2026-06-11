import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string; // Optional standard PrimeIcons tokens string target (ex: 'pi pi-folder')
  count?: number; // Optional data tracking counters overlay value
  customMeta?: any; // Flexible payload pointer for API parsing logic integration downstream
}

@Component({
  selector: 'app-utility-bar',
  imports: [CommonModule],
  templateUrl: './utility-bar.component.html',
  styleUrl: './utility-bar.component.scss',
})
export class UtilityBarComponent {
  @Input() menuOptions: BarOptionItem[] = [];

  // 2. INPUT: Sets a safe default start focus tracking parameter index state
  @Input() selectedOptionIndex: number = 0;

  // 3. OUTPUT: Notifies the parent component when an action index gets active
  @Output() onOptionSelected = new EventEmitter<{
    index: number;
    payload: BarOptionItem;
  }>();

  /**
   * Updates state indexes values and distributes execution streams parameters safely
   */
  selectOption(index: number, optionItem: BarOptionItem): void {
    this.selectedOptionIndex = index;
    this.onOptionSelected.emit({ index: index, payload: optionItem });
  }
}
