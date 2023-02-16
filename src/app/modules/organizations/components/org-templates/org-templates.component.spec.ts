import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationsService } from '@services/organizations.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { OrgTemplatesComponent } from './org-templates.component';

describe('OrgTemplatesComponent', () => {
  let component: OrgTemplatesComponent;
  let fixture: ComponentFixture<OrgTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgTemplatesComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        OrganizationsService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
