import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '@services/authorization.service';
import { ApplicationUserExtended } from '@models/extended';
import { TitleService } from '@services/title.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { OrganizationInvitationsService } from '@services/organization-invitations.service';
import { JoinToOrgInvitation } from '@models/organizations/join-to-org-invitation.model';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  templateUrl: './me.component.html'
})
export class MeComponent implements OnInit, OnDestroy {
  user: ApplicationUserExtended | null = null;

  invitations: Array<JoinToOrgInvitation> | null = null;
  showYouHaveBeenInvitedDialog = false;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly auth: AuthService,
    private readonly titleService: TitleService,
    private readonly invitationService: OrganizationInvitationsService
  ) {}

  ngOnInit(): void {
    this.authorizationService
      .getMe()
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = new ApplicationUserExtended(user);

        this.invitationService.forMe()
        .pipe(untilDestroyed(this))
        .subscribe((invitations) => {
          this.invitations = invitations;
          this.showYouHaveBeenInvitedDialog = invitations.length > 0;
        });
      });

    this.titleService.setTitle('My profile');
  }

  ngOnDestroy(): void {}

  onInvitationsModalDlgClose(): void {
    this.showYouHaveBeenInvitedDialog = false;
  }

  accept(invitation: JoinToOrgInvitation): void {
    if (confirm('You are accepting the invitation. Then you will be signed off the system. Are you sure?')) {
      this.invitationService.accept(invitation.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.auth.signout();
      });
    }
  }

  decline(invitation: JoinToOrgInvitation): void {
    if (confirm('You want to reject the invitation. Are you sure?')) {
      this.invitationService.reject(invitation.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
