import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationsService } from '@services/organizations.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { AllOrganizationsAdminComponent } from './all-organizations-admin.component';

describe('AllOrganizationsAdminComponent', () => {
  let component: AllOrganizationsAdminComponent;
  let fixture: ComponentFixture<AllOrganizationsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllOrganizationsAdminComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, OrganizationsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrganizationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
