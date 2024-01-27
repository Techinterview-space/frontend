import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationUser } from '@models/application-user';
import { UserRoleEnum } from '@models/enums';
import { ApplicationUserExtended } from '@models/extended';
import { defaultPageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { TitleService } from '@services/title.service';
import { UserAdminService } from '@services/user-admin.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { UserRolesEditForm } from './user-roles-edit-form';

@Component({
  templateUrl: './users-admin-page.component.html'
})
export class UsersAdminPageComponent implements OnInit, OnDestroy {
  get hasSelectedUser(): boolean {
    return !!this.selectedUser;
  }

  selectedUser: ApplicationUserExtended | null = null;
  users: Array<ApplicationUserExtended> | null = null;
  source: PaginatedList<ApplicationUser> | null = null;

  userRolesForm: UserRolesEditForm | null = null;
  readonly options = UserRoleEnum.options();

  constructor(private readonly service: UserAdminService, private readonly titleService: TitleService) {}

  ngOnInit(): void {
    this.userRolesForm = null;
    this.loadData();
    this.titleService.setTitle('All users');
  }

  loadData(page = 1): void {
    this.users = null;
    this.source = null;

    this.service
      .all({ ...defaultPageParams, page })
      .pipe(untilDestroyed(this))
      .subscribe((users) => {
        this.users = users.results.map((x) => new ApplicationUserExtended(x));
        this.source = users;
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
}
