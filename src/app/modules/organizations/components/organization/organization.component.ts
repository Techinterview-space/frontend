import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from '@models/organizations/organization.model';
import { OrganizationsService } from '@services/organizations.service';
import { TitleService } from '@services/title.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { CreateOrEditOrganizationForm } from '../create-or-edit-organization-form';
import { InviteUserForm } from './invite-user-form';
import { OrganizationInvitationsService } from '@services/organization-invitations.service';
import { ApplicationUserExtended } from '@models/extended';
import { AuthService } from '@shared/services/auth/auth.service';
import { JoinToOrgInvitation } from '@models/organizations/join-to-org-invitation.model';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { UserRole } from '@models/enums';
import { OrganizationUser } from '@models/organizations/organization-user.model';

@Component({
  templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit, OnDestroy {
  pageTitle = 'Organization';
  organization: Organization | null = null;
  showCreateDialog = false;
  editForm: CreateOrEditOrganizationForm | null = null;
  inviteUserForm: InviteUserForm | null = null;

  currentUser: ApplicationUserExtended | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  showActions = false;
  openByMemberOfTheOrganization = false;

  private readonly activatedRoute: ActivatedRouteExtended | null = null;

  constructor(
    private readonly auth: AuthService,
    private readonly alert: AlertService,
    private readonly title: TitleService,
    private readonly service: OrganizationsService,
    activatedRoute: ActivatedRoute,
    private readonly orgInvitationService: OrganizationInvitationsService
  ) {
    this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.editForm = null;
    this.inviteUserForm = null;

    this.activatedRoute!.getParam('id')
      .pipe(untilDestroyed(this))
      .subscribe((id) => {

        this.service
          .byId(id!)
          .pipe(untilDestroyed(this))
          .subscribe((organization: Organization) => {
            this.organization = organization;
            this.pageTitle = organization.name;
            this.title.setTitle('Organization ' + organization.name);

            this.auth
              .getCurrentUser()
              .pipe(untilDestroyed(this))
              .subscribe((user) => {
                this.currentUser = user;
                this.showActions =
                  this.currentUser!.hasRole(UserRole.Admin) || this.organization?.managerId === this.currentUser?.id;

                this.openByMemberOfTheOrganization = this.showActions || this.organization!.users.some(m => m.userId === this.currentUser?.id);
              });
          });
      });
  }

  ngOnDestroy(): void {
    // nothing
  }

  openEditDialog(): void {
    this.editForm = new CreateOrEditOrganizationForm(this.organization);
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  onFormSubmit(): void {
    if (this.editForm == null) {
      return;
    }

    const updateRequest = this.editForm.updateRequestOrNull();
    if (updateRequest == null) {
      return;
    }

    this.service
      .update(updateRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success('Organization updated');
        this.ngOnInit();
      });
  }

  delete(): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Delete the organization',
        'Are you sure to delete? Users, candidates, etc, will stay in the system',
        () => {
          this.service
            .delete(this.organization!.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('Organization deleted');
              this.ngOnInit();
            });
        }
      )
    );
  }

  remove(): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Totally remove the organization',
        'Are you sure to delete? All related data will be removed',
        () => {
          this.service
            .remove(this.organization!.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('Organization totally removed');
              this.ngOnInit();
            });
        }
      )
    );
  }

  removeInvitation(invitation: JoinToOrgInvitation): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg('Revoke the invitation', 'Are you sure to revoke this invitation?', () => {
        this.orgInvitationService
          .delete(invitation.id)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.alert.success('Invitation was revoked');
            this.ngOnInit();
          });
      })
    );
  }

  openInviteDialog(): void {
    this.inviteUserForm = new InviteUserForm(this.organization!);
  }

  onInviteUserModalDlgClose(): void {
    this.inviteUserForm = null;
  }

  onInviteUserFormSubmit(): void {
    if (this.inviteUserForm == null) {
      return;
    }

    const inviteRequest = this.inviteUserForm.requestOrNull();
    if (inviteRequest == null) {
      return;
    }

    this.orgInvitationService
      .inviteUser(inviteRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success('User was invited');
        this.ngOnInit();
      });
  }

  excludeUser(user: OrganizationUser): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Exclude the user',
        `Are you sure to exclude ${user.user?.fullname} from this organization?`,
        () => {
          this.service
            .excludeUserFromOrganization(this.organization!.id, user.userId)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('User was excluded');
              this.ngOnInit();
            });
        }
      )
    );
  }
}
