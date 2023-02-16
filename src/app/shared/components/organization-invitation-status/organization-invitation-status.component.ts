import { Component, Input, OnInit } from '@angular/core';
import { InvitationStatus } from '@models/organizations/invitation-status.enum';

@Component({
  selector: 'app-organization-invitation-status',
  templateUrl: './organization-invitation-status.component.html'
})
export class OrganizationInvitationStatusComponent implements OnInit {
  title = '';
  style = '';

  @Input()
  status: InvitationStatus | null = null;

  ngOnInit(): void {
    switch (this.status) {
      case InvitationStatus.Pending:
        this.style = 'info text-dark';
        break;

      case InvitationStatus.Accepted:
        this.style = 'success';
        break;

      case InvitationStatus.Declined:
        this.style = 'warning text-dark';
        break;

      default:
        this.style = 'light text-dark';
        break;
    }

    if (this.status) {
      this.title = InvitationStatus[this.status];
    } else {
      this.title = 'Unknown';
    }
  }
}
