import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateCardsService } from '@services/candidate-cards.service';
import { OrganizationLabelsService } from '@services/organization-labels.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { CardUserCommentComponent } from './card-user-comment.component';

describe('CardUserCommentComponent', () => {
  let component: CardUserCommentComponent;
  let fixture: ComponentFixture<CardUserCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardUserCommentComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, CandidateCardsService, OrganizationLabelsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUserCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
