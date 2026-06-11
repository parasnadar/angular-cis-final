import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  ElementRef,
  OnInit,
  input,
} from '@angular/core';

export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string;
  children?: BarOptionItem[];
  customMeta?: any;
}

@Component({
  selector: 'app-utility-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utility-bar.component.html',
  styleUrl: './utility-bar.component.scss',
})
export class UtilityBarComponent implements OnInit {
  username = input<string>('GUEST');
  initials = input<string>('GS');
  @Input() menuOptions: BarOptionItem[] = [];
  @Input() defaultSelectId: string | number = 'cause_list';

  @Output() onOptionSelected = new EventEmitter<{
    parent: BarOptionItem;
    child?: BarOptionItem;
  }>();
  @Output() onAccountAction = new EventEmitter<string>();

  activeDropdownIndex: number | null = null;
  isProfileMenuOpen: boolean = false;

  currentSelectedItem: BarOptionItem | null = null; // Precise choice (could be parent or child)
  currentSelectedParent: BarOptionItem | null = null; // Stays locked onto the root parent tab

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initializeDefaultSelection();
  }

  initializeDefaultSelection(): void {
    if (this.menuOptions && this.menuOptions.length > 0) {
      for (const item of this.menuOptions) {
        if (item.id === this.defaultSelectId) {
          this.currentSelectedItem = item;
          this.currentSelectedParent = item;
          return;
        }
        if (item.children) {
          const match = item.children.find(
            (c) => c.id === this.defaultSelectId,
          );
          if (match) {
            this.currentSelectedItem = match;
            this.currentSelectedParent = item; // Highlight this parent tab
            return;
          }
        }
      }
      // Ultimate fallback to first row configuration item
      this.currentSelectedItem = this.menuOptions[0];
      this.currentSelectedParent = this.menuOptions[0];
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeAllMenus();
    }
  }

  toggleDropdown(event: Event, index: number): void {
    event.stopPropagation();
    this.isProfileMenuOpen = false;
    this.activeDropdownIndex =
      this.activeDropdownIndex === index ? null : index;
  }

  toggleProfileMenu(event: Event): void {
    event.stopPropagation();
    this.activeDropdownIndex = null;
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  handleParentClick(item: BarOptionItem, index: number, event: Event): void {
    if (item.children && item.children.length > 0) {
      this.toggleDropdown(event, index);
    } else {
      this.currentSelectedItem = item;
      this.currentSelectedParent = item; // Parent is itself
      this.closeAllMenus();
      this.onOptionSelected.emit({ parent: item });
    }
  }

  handleChildClick(
    parentItem: BarOptionItem,
    childItem: BarOptionItem,
    event: Event,
  ): void {
    event.stopPropagation();
    this.currentSelectedItem = childItem; // Highlights specific child row
    this.currentSelectedParent = parentItem; // Simultaneously flags and holds parent active styling
    this.closeAllMenus();
    this.onOptionSelected.emit({ parent: parentItem, child: childItem });
  }

  handleAccountAction(actionType: string): void {
    this.closeAllMenus();
    this.onAccountAction.emit(actionType);
  }

  closeAllMenus(): void {
    this.activeDropdownIndex = null;
    this.isProfileMenuOpen = false;
  }
}
