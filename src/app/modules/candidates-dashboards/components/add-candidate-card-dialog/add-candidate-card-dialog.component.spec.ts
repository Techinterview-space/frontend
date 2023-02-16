import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateCardsService } from '@services/candidate-cards.service';
import { OrganizationLabelsService } from '@services/organization-labels.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { BoardService } from '../models/board.service';

import { AddCandidateCardDialogComponent } from './add-candidate-card-dialog.component';

describe('AddCandidateCardDialogComponent', () => {
  let component: AddCandidateCardDialogComponent;
  let fixture: ComponentFixture<AddCandidateCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCandidateCardDialogComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, BoardService, CandidateCardsService, OrganizationLabelsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCandidateCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
