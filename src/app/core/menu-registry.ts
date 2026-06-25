import { Type } from '@angular/core';
import { DefectNoticesComponent } from '../Shared/menus/report/defect-notices/defect-notices.component';
import { ScrutinizedCasesComponent } from '../Shared/menus/report/scrutinized-cases/scrutinized-cases.component';
import { FinalCauselistComponent } from '../Shared/menus/causelist/final-causelist/final-causelist.component';
// 2. Map the menu string IDs to their compiled component classes
export const MENU_REGISTRY: Record<string, Type<any>> = {
  final_causelist: FinalCauselistComponent,
  defect_notices: DefectNoticesComponent,
  scrutinized_notices: ScrutinizedCasesComponent,

  // Add more mappings here as you create more screens
};
