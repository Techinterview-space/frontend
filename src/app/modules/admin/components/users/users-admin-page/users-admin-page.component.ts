import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApplicationUser } from "@models/application-user";
import { UserRoleEnum } from "@models/enums";
import { ApplicationUserExtended } from "@models/extended";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import {
  UserAdminService,
  UserSearchParams,
} from "@services/user-admin.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { UserRolesEditForm } from "./user-roles-edit-form";

@Component({
  templateUrl: "./users-admin-page.component.html",
  standalone: false,
})
export class UsersAdminPageComponent implements OnInit, OnDestroy {
  get hasSelectedUser(): boolean {
    return !!this.selectedUser;
  }

  selectedUser: ApplicationUserExtended | null = null;
  users: Array<ApplicationUserExtended> | null = null;
  source: PaginatedList<ApplicationUser> | null = null;

  userRolesForm: UserRolesEditForm | null = null;
  filterForm: FormGroup;
  readonly options = UserRoleEnum.options();

  constructor(
    private readonly service: UserAdminService,
    private readonly titleService: TitleService,
    private readonly fb: FormBuilder,
    private readonly alertService: AlertService,
  ) {
    this.filterForm = this.fb.group({
      email: [""],
      unsubscribeMeFromAll: [null],
      isLockedOut: [null],
      emailConfirmed: [null],
    });
  }

  ngOnInit(): void {
    this.userRolesForm = null;
    this.loadData();
    this.titleService.setTitle("Пользователи");
  }

  loadData(page = 1): void {
    this.users = null;
    this.source = null;

    const formValue = this.filterForm.value;
    const searchParams: UserSearchParams = {
      ...defaultPageParams,
      page,
      email: formValue.email || null,
      unsubscribeMeFromAll: formValue.unsubscribeMeFromAll,
      isLockedOut: formValue.isLockedOut,
      emailConfirmed: formValue.emailConfirmed,
    };

    this.service
      .all(searchParams)
      .pipe(untilDestroyed(this))
      .subscribe((users) => {
        this.users = users.results.map((x) => new ApplicationUserExtended(x));
        this.source = users;
      });
  }

  unlockUser(user: ApplicationUser): void {
    this.service
      .unlockUser(user.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Пользователь разблокирован");
          this.loadData();
        },
        error: (err) => {
          this.alertService.error(err.error?.message || "Не удалось разблокировать пользователя");
        },
      });
  }

  resetFailedAttempts(user: ApplicationUser): void {
    this.service
      .resetFailedAttempts(user.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Счетчик неудачных попыток сброшен");
          this.loadData();
        },
        error: (err) => {
          this.alertService.error(err.error?.message || "Не удалось сбросить счетчик");
        },
      });
  }

  forceVerifyEmail(user: ApplicationUser): void {
    this.service
      .forceVerifyEmail(user.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Email подтвержден");
          this.loadData();
        },
        error: (err) => {
          this.alertService.error(err.error?.message || "Не удалось подтвердить email");
        },
      });
  }

  resendVerification(user: ApplicationUser): void {
    this.service
      .resendVerification(user.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Письмо с подтверждением отправлено");
        },
        error: (err) => {
          this.alertService.error(err.error?.message || "Не удалось отправить письмо");
        },
      });
  }

  ngOnDestroy(): void {}

  openUserRolesForm(user: ApplicationUser): void {
    this.userRolesForm = new UserRolesEditForm(user);
  }

  onEditModalDlgClose(): void {
    this.userRolesForm = null;
  }

  onFormSubmit(): void {
    if (!this.userRolesForm) {
      return;
    }

    const request = this.userRolesForm.requestOrNull();
    if (!request) {
      return;
    }

    this.service
      .updateRoles(request)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.userRolesForm = null;
        this.loadData();
      });
  }

  applyFilters(): void {
    this.loadData(1);
  }

  resetFilters(): void {
    this.filterForm.reset({
      email: "",
      unsubscribeMeFromAll: null,
      isLockedOut: null,
      emailConfirmed: null,
    });
    this.loadData(1);
  }
}
