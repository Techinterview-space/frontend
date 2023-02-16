import { Component, OnDestroy, OnInit } from '@angular/core';
import { Organization } from '@models/organizations/organization.model';
import { OrganizationsService } from '@services/organizations.service';
import { TitleService } from '@services/title.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { CreateOrEditOrganizationForm } from '../create-or-edit-organization-form';

@Component({
  templateUrl: './my-organizations.component.html'
})
export class MyOrganizationsComponent implements OnInit, OnDestroy {
  organizations: Array<Organization> | null = null;
  editForm: CreateOrEditOrganizationForm | null = null;

  constructor(
    private readonly alert: AlertService,
    private readonly title: TitleService,
    private readonly service: OrganizationsService
  ) {
    this.title.setTitle('My organizations');
  }

  ngOnDestroy(): void {
    // nothing
  }

  ngOnInit(): void {
    this.editForm = null;
    this.service
      .my()
      .pipe(untilDestroyed(this))
      .subscribe((organizations: Array<Organization>) => {
        this.organizations = organizations;
      });
  }

  openCreateDialog(): void {
    this.editForm = new CreateOrEditOrganizationForm(null);
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  onFormSubmit(): void {
    if (this.editForm == null) {
      return;
    }

    const request = this.editForm.createRequestOrNull();
    if (request == null) {
      return;
    }

    this.service
      .create(request)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success('Organization was created');
        this.ngOnInit();
      });
  }
}
