import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationsService } from '@services/organizations.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { CandidateCardViewComponent } from './candidate-card-view.component';

describe('CandidateCardViewComponent', () => {
  let component: CandidateCardViewComponent;
  let fixture: ComponentFixture<CandidateCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateCardViewComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, OrganizationsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
