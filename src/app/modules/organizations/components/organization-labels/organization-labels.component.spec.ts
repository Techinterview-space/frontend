import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationLabelsService } from '@services/organization-labels.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { OrganizationLabelsComponent } from './organization-labels.component';

describe('OrganizationLabelsComponent', () => {
  let component: OrganizationLabelsComponent;
  let fixture: ComponentFixture<OrganizationLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationLabelsComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, OrganizationLabelsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
