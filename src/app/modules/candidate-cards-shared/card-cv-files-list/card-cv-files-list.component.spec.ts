import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateCardsService } from '@services/candidate-cards.service';
import { CandidateCvService } from '@services/candidate-cv.service';
import { OrganizationLabelsService } from '@services/organization-labels.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { CardCvFilesListComponent } from './card-cv-files-list.component';

describe('CardCvFilesListComponent', () => {
  let component: CardCvFilesListComponent;
  let fixture: ComponentFixture<CardCvFilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCvFilesListComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        CandidateCardsService,
        OrganizationLabelsService,
        CandidateCvService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCvFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
