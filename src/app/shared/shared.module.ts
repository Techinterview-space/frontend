import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from "./components/alert/component/alert.component";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { ActiveUserGuard } from "./guards/active-user.guard";
import { FieldErrorComponent } from "./components/field-error/field-error.component";
import { ConfirmDialogComponent } from "./components/dialogs/confirm-dialog/confirm-dialog.component";
import { DeclineDialogComponent } from "./components/dialogs/decline-dialog/decline-dialog.component";
import { HasRoleDirective } from "./directives/has-role.directive";
import { DisableControlDirective } from "./directives/disabled-control.directive";
import { OnlyNumberDirective } from "./directives/numbers-only.directive";
import { LatinCharactersDirective } from "./directives/latin-characters.directive";
import { DateRangeValidator } from "./directives/date-range.directive";
import { YearRangeValidator } from "./directives/year-range.directive";
import { GoBackButtonComponent } from "./components/go-back-button/go-back-button.component";
import { SubmitButtonComponent } from "./components/submit-button/submit-button.component";
import { NoSanitizePipe } from "./directives/no-sanitize.directive";
import { IsMobileDirective } from "./directives/is-mobile.directive";
import { IsDesktopDirective } from "./directives/is-desktop.directive";
import { AppPageHeaderComponent } from "./components/app-page-header/app-page-header.component";
import { DeveloperGradeLabelComponent } from "./components/developer-grade-label/developer-grade-label.component";
import { VisibilityLabelComponent } from "./components/visibility-label/visibility-label.component";
import { UserRolesLabelComponent } from "./components/user-roles-label/user-roles-label.component";
import { DialogComponent } from "./components/dialogs/dialog/dialog.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { DataLoadingInfoBlockComponent } from "./components/data-loading-info-block/data-loading-info-block.component";
import { PaginationButtonsComponent } from "./components/pagination-buttons/pagination-buttons.component";
import { LoadingButtonComponent } from "./components/loading-button/loading-button.component";
import { LabelComponent } from "./components/label/label.component";
import { StatusLabelComponent } from "./components/status-label/status-label.component";
import { UserLinkComponent } from "./components/user-link/user-link.component";
import { RouterModule } from "@angular/router";
import { MarkdownModule } from "ngx-markdown";
import { ShareButtonComponent } from "./components/share-button/share-button.component";
import { LabelsNgSelectComponent } from "./components/labels-ng-select/labels-ng-select.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { WednesdayFrogComponent } from "./components/wednesday-frog/wednesday-frog.component";
import { FormatAsMoneyPipe } from "./directives/format-as-money.pipe";
import { StarRatingComponent } from "./components/star-rating/star-rating.component";

const componentsToDeclareAndExport = [
  AlertComponent,
  DialogComponent,
  AppPageHeaderComponent,
  FieldErrorComponent,
  ConfirmDialogComponent,
  DeclineDialogComponent,
  HasRoleDirective,
  DisableControlDirective,
  OnlyNumberDirective,
  LatinCharactersDirective,
  DateRangeValidator,
  YearRangeValidator,
  GoBackButtonComponent,
  SubmitButtonComponent,
  IsDesktopDirective,
  IsMobileDirective,
  NoSanitizePipe,
  DeveloperGradeLabelComponent,
  VisibilityLabelComponent,
  UserRolesLabelComponent,
  LoadingSpinnerComponent,
  DataLoadingInfoBlockComponent,
  PaginationButtonsComponent,
  LoadingButtonComponent,
  LabelComponent,
  StatusLabelComponent,
  UserLinkComponent,
  ShareButtonComponent,
  LabelsNgSelectComponent,
  WednesdayFrogComponent,
  FormatAsMoneyPipe,
  StarRatingComponent,
];

@NgModule({
  declarations: componentsToDeclareAndExport,
  exports: componentsToDeclareAndExport,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    MarkdownModule.forChild(),
  ],
  providers: [AuthGuard, AdminGuard, ActiveUserGuard],
})
export class SharedModule {}
