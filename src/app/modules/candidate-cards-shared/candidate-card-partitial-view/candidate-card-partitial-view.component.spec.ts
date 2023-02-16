import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateCardsService } from '@services/candidate-cards.service';
import { OrganizationLabelsService } from '@services/organization-labels.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { CandidateCardPartitialViewComponent } from './candidate-card-partitial-view.component';

describe('CandidateCardPartitialViewComponent', () => {
  let component: CandidateCardPartitialViewComponent;
  let fixture: ComponentFixture<CandidateCardPartitialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateCardPartitialViewComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, CandidateCardsService, OrganizationLabelsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCardPartitialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
