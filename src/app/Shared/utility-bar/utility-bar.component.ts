import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
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
export class UtilityBarComponent implements OnInit, OnChanges {
  username = input<string>('GUEST');
  initials = input<string>('GS');
  @Input() menuOptions: BarOptionItem[] = [];
  @Input() defaultSelectId: string | number = 'cause_list';
  @Input() maxVisibleItems: number = 8;

  @Output() onOptionSelected = new EventEmitter<{
    parent: BarOptionItem;
    child?: BarOptionItem;
  }>();
  @Output() onAccountAction = new EventEmitter<string>();

  visibleMenuOptions: BarOptionItem[] = [];
  overflowMenuOptions: BarOptionItem[] = [];

  activeDropdownIndex: number | null = null;
  isMoreMenuOpen: boolean = false;
  isProfileMenuOpen: boolean = false;

  // Mobile Drawer States
  isMobileDrawerOpen: boolean = false;
  activeMobileAccordionIndex: number | null = null;

  currentSelectedItem: BarOptionItem | null = null;
  currentSelectedParent: BarOptionItem | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.processMenuLayout();
    this.initializeDefaultSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuOptions'] || changes['maxVisibleItems']) {
      this.processMenuLayout();
    }
  }

  processMenuLayout(): void {
    if (!this.menuOptions) return;
    if (this.menuOptions.length > this.maxVisibleItems) {
      this.visibleMenuOptions = this.menuOptions.slice(0, this.maxVisibleItems);
      this.overflowMenuOptions = this.menuOptions.slice(this.maxVisibleItems);
    } else {
      this.visibleMenuOptions = [...this.menuOptions];
      this.overflowMenuOptions = [];
    }
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
            this.currentSelectedParent = item;
            return;
          }
        }
      }
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
    this.isMoreMenuOpen = false;
    this.activeDropdownIndex =
      this.activeDropdownIndex === index ? null : index;
  }

  toggleMoreMenu(event: Event): void {
    event.stopPropagation();
    this.isProfileMenuOpen = false;
    this.activeDropdownIndex = null;
    this.isMoreMenuOpen = !this.isMoreMenuOpen;
  }

  toggleProfileMenu(event: Event): void {
    event.stopPropagation();
    this.activeDropdownIndex = null;
    this.isMoreMenuOpen = false;
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  // Mobile Drawer Triggers
  toggleMobileDrawer(event: Event): void {
    event.stopPropagation();
    this.closeAllMenus();
    this.isMobileDrawerOpen = !this.isMobileDrawerOpen;
  }

  toggleMobileAccordion(index: number, event: Event): void {
    event.stopPropagation();
    this.activeMobileAccordionIndex =
      this.activeMobileAccordionIndex === index ? null : index;
  }

  handleParentClick(item: BarOptionItem, index: number, event: Event): void {
    if (item.children && item.children.length > 0) {
      this.toggleDropdown(event, index);
    } else {
      this.currentSelectedItem = item;
      this.currentSelectedParent = item;
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
    this.currentSelectedItem = childItem;
    this.currentSelectedParent = parentItem;
    this.closeAllMenus();
    this.onOptionSelected.emit({ parent: parentItem, child: childItem });
  }

  isOverflowActive(): boolean {
    if (!this.currentSelectedParent) return false;
    return this.overflowMenuOptions.some((item) => {
      if (item.id === this.currentSelectedParent?.id) return true;
      if (item.children) {
        return item.children.some(
          (c) =>
            c.id === this.currentSelectedItem?.id ||
            c.id === this.currentSelectedParent?.id,
        );
      }
      return false;
    });
  }

  handleAccountAction(actionType: string): void {
    this.closeAllMenus();
    this.onAccountAction.emit(actionType);
  }

  closeAllMenus(): void {
    this.activeDropdownIndex = null;
    this.isProfileMenuOpen = false;
    this.isMoreMenuOpen = false;
    this.isMobileDrawerOpen = false;
  }
}
