import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationsService } from '@services/organizations.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { CandidatesComponent } from './candidates.component';

describe('CandidatesComponent', () => {
  let component: CandidatesComponent;
  let fixture: ComponentFixture<CandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatesComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, OrganizationsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
