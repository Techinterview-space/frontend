import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationInvitationsService } from '@services/organization-invitations.service';
import { OrganizationsService } from '@services/organizations.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { OrganizationComponent } from './organization.component';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, OrganizationsService, OrganizationInvitationsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
