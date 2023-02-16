import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationInvitationStatusComponent } from './organization-invitation-status.component';

describe('OrganizationInvitationStatusComponent', () => {
  let component: OrganizationInvitationStatusComponent;
  let fixture: ComponentFixture<OrganizationInvitationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationInvitationStatusComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationInvitationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
