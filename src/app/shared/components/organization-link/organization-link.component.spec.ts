import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationLinkComponent } from './organization-link.component';

describe('OrganizationLinkComponent', () => {
  let component: OrganizationLinkComponent;
  let fixture: ComponentFixture<OrganizationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationLinkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
