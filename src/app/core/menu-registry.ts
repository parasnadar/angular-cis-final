import { Type } from '@angular/core';
import { DefectNoticesComponent } from '../Shared/menus/report/defect-notices/defect-notices.component';
import { ScrutinizedCasesComponent } from '../Shared/menus/report/scrutinized-cases/scrutinized-cases.component';
import { FinalCauselistComponent } from '../Shared/menus/causelist/final-causelist/final-causelist.component';
import { GenerateOrderComponent } from '../Shared/menus/order/generate-order/generate-order.component';
import { UploadOrderComponent } from '../Shared/menus/order/upload-order/upload-order.component';
import { ScrutinyComponent } from '../Shared/menus/document-scrutiny/scrutiny/scrutiny.component';
import { DraftCauselistComponent } from '../Shared/menus/causelist/draft-causelist/draft-causelist.component';
import { CaseDocsComponent } from '../Shared/menus/report/case-docs/case-docs.component';
import { InterBenchComponent } from '../Shared/menus/listing/inter-bench/inter-bench.component';
import { MisReportComponent } from '../Shared/menus/report/mis-report/mis-report.component';
import { EfiledCasesComponent } from '../Shared/menus/report/efiled-cases/efiled-cases.component';
import { CaseStatusComponent } from '../Shared/menus/report/case-status/case-status.component';
import { TransferActionTakenComponent } from '../Shared/menus/transfer-case/transfer-action-taken/transfer-action-taken.component';
import { TransferRequestComponent } from '../Shared/menus/transfer-case/transfer-request/transfer-request.component';
import { RecuseJudgesFromCaseComponent } from '../Shared/menus/recuse/recuse-judges-from-case/recuse-judges-from-case.component';
import { RecusedCasesComponent } from '../Shared/menus/recuse/recused-cases/recused-cases.component';
import { CreateNoticeComponent } from '../Shared/menus/notice/create-notice/create-notice.component';
import { NoticeListsComponent } from '../Shared/menus/notice/notice-lists/notice-lists.component';
import { CreateBenchComponent } from '../Shared/menus/bench/create-bench/create-bench.component';
import { ViewBenchComponent } from '../Shared/menus/bench/view-bench/view-bench.component';
import { FreshCaseListingComponent } from '../Shared/menus/listing/fresh-case-listing/fresh-case-listing.component';
import { TransferCasesComponent } from '../Shared/menus/listing/transfer-cases/transfer-cases.component';
import { ConnectCasesComponent } from '../Shared/menus/listing/connect-cases/connect-cases.component';
import { DisconnectCasesComponent } from '../Shared/menus/listing/disconnect-cases/disconnect-cases.component';
import { SearchCaseComponent } from '../Shared/menus/report/search-case/search-case.component';
import { CaseProceedingComponent } from '../Shared/menus/proceeding/case-proceeding/case-proceeding.component';
import { CaseProceedingReportComponent } from '../Shared/menus/proceeding/case-proceeding-report/case-proceeding-report.component';

export const MENU_REGISTRY: Record<string, Type<any>> = {
  //bench
  create_bench: CreateBenchComponent,
  view_bench: ViewBenchComponent,
  //Report
  defect_notices: DefectNoticesComponent,
  scrutinized_cases: ScrutinizedCasesComponent,
  mis_report: MisReportComponent,
  case_docs: CaseDocsComponent,
  efiled_cases: EfiledCasesComponent,
  case_status: CaseStatusComponent,
  search_case: SearchCaseComponent,
  //causelist
  final_causelist: FinalCauselistComponent,
  draft_causelist: DraftCauselistComponent,
  //Document Scrutiny
  scrutiny: ScrutinyComponent,
  //Notice
  create_notice: CreateNoticeComponent,
  notice_lists: NoticeListsComponent,
  //Order
  generate_order: GenerateOrderComponent,
  upload_order: UploadOrderComponent,
  //Transfer Case
  transfer_action_taken: TransferActionTakenComponent,
  transfer_request: TransferRequestComponent,
  //Recuse
  recuse_judge_from_case: RecuseJudgesFromCaseComponent,
  recused_cases: RecusedCasesComponent,
  //Listing
  inter_bench: InterBenchComponent,
  fresh_case_listing: FreshCaseListingComponent,
  transfer_cases: TransferCasesComponent,
  connect_cases: ConnectCasesComponent,
  disconnect_cases: DisconnectCasesComponent,
  //Proceeding
  case_proceeding: CaseProceedingComponent,
  case_proceeding_report: CaseProceedingReportComponent,
  // Add more mappings here as you create more screens
};
