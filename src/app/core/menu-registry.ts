import { Type } from '@angular/core';
import { CauselistComponent } from '../Shared/menus/causelist/causelist.component';

// 2. Map the menu string IDs to their compiled component classes
export const MENU_REGISTRY: Record<string, Type<any>> = {
  stcause_list: CauselistComponent,

  // Add more mappings here as you create more screens
};
