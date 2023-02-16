import { Component, Input } from '@angular/core';
import { Organization } from '@models/organizations/organization.model';

@Component({
  selector: 'app-organization-link',
  templateUrl: './organization-link.component.html'
})
export class OrganizationLinkComponent {
  @Input()
  organization: Organization | null = null;

  @Input()
  css = '';
}
