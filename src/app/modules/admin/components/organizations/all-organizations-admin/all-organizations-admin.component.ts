import { Component, OnDestroy, OnInit } from '@angular/core';
import { Organization } from '@models/organizations/organization.model';
import { OrganizationsService } from '@services/organizations.service';
import { TitleService } from '@services/title.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';

@Component({
  selector: 'app-all-organizations-admin',
  templateUrl: './all-organizations-admin.component.html',
  styleUrls: ['./all-organizations-admin.component.scss']
})
export class AllOrganizationsAdminComponent implements OnInit, OnDestroy {
  organizations: Array<Organization> | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  constructor(
    private readonly alert: AlertService,
    private readonly title: TitleService,
    private readonly service: OrganizationsService
  ) {
    this.title.setTitle('All organizations');
  }

  ngOnDestroy(): void {
    // nothing
  }

  ngOnInit(): void {
    this.service
      .all()
      .pipe(untilDestroyed(this))
      .subscribe((organizations: Array<Organization>) => {
        this.organizations = organizations;
      });
  }

  deleteOrganization(organization: Organization): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Delete the organization',
        'Are you sure to delete? Users, candidates, etc, will stay in the system',
        () => {
          this.service
            .delete(organization.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('Organization deleted');
              this.ngOnInit();
            });
        }
      )
    );
  }

  removeOrganization(organization: Organization): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Totally remove the organization',
        'Are you sure to delete? All related data will be removed',
        () => {
          this.service
            .remove(organization.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('Organization totally removed');
              this.ngOnInit();
            });
        }
      )
    );
  }
}
