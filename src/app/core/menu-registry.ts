import { Type } from '@angular/core';
import { CauselistComponent } from '../Shared/menus/causelist/causelist.component';
import { DefectNoticesComponent } from '../Shared/menus/report/defect-notices/defect-notices.component';

// 2. Map the menu string IDs to their compiled component classes
export const MENU_REGISTRY: Record<string, Type<any>> = {
  stfinal_causelist: CauselistComponent,
  sdefect_notices: DefectNoticesComponent,

  // Add more mappings here as you create more screens
};
