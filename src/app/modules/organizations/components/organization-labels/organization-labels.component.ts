import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUserExtended } from '@models/extended';
import { Organization } from '@models/organizations/organization.model';
import { Label } from '@models/user-label.model';
import { OrganizationLabelsService } from '@services/organization-labels.service';
import { OrganizationsService } from '@services/organizations.service';
import { TitleService } from '@services/title.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { AuthService } from '@shared/services/auth/auth.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { OrganizationLabelEditForm } from './organization-label-edit-form';

@Component({
  templateUrl: './organization-labels.component.html'
})
export class OrganizationLabelsComponent implements OnInit, OnDestroy {
  labels: Array<Label> | null = null;
  organization: Organization | null = null;

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  editForm: OrganizationLabelEditForm | null = null;
  isManagerOfTheOrg = false;

  private organizationId: string | null = null;
  private currentUser: ApplicationUserExtended | null = null;
  private readonly activatedRoute: ActivatedRouteExtended;

  constructor(
    private readonly auth: AuthService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly service: OrganizationLabelsService,
    private readonly orgService: OrganizationsService,
    activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  ngOnInit(): void {
    this.title.setTitle('Organization labels');
    this.activatedRoute
      .getParam('id')
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.organizationId = id!;
        this.service
          .forOrganization(id!)
          .pipe(untilDestroyed(this))
          .subscribe((x) => {
            this.labels = x;
          });

          this.orgService
            .byIdSimple(id!)
            .pipe(untilDestroyed(this))
            .subscribe((organization) => {
              this.organization = organization;
              this.auth
              .getCurrentUser()
              .pipe(untilDestroyed(this))
              .subscribe((currentUser) => {
                this.currentUser = currentUser;
                this.isManagerOfTheOrg = this.currentUser!.id === this.organization!.managerId;
              });
            });
      });
  }

  edit(item: Label): void {
    this.editForm = new OrganizationLabelEditForm(item, this.organizationId);
  }

  onFormSubmit(): void {
    const request = this.editForm!.requestOrNull();
    if (request == null) {
      return;
    }

    this.labels = null;
    this.service
      .update(request)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success('The label was updated');
        this.editForm = null;
        this.ngOnInit();
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  delete(item: Label): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Delete the label',
        'Are you sure to delete? Interviews, templates, etc, with the label will stay in the system',
        () => {
          this.service
            .delete(item.id!)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('The label was removed');
              this.confirmDeletionMessage = null;
              this.ngOnInit();
            });
        }
      )
    );
  }
}
