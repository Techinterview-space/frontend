import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateCardsService } from '@services/candidate-cards.service';
import { InterviewTemplatesService } from '@services/interview-templates.service';
import { InterviewsService } from '@services/interviews.service';
import { OrganizationsService } from '@services/organizations.service';
import { UserLabelsService } from '@services/user-labels.service';
import { mostUsedImports, mostUsedServices, testUtilStubs } from '@shared/test-utils';

import { InterviewEditPageComponent } from './interview-edit-page.component';

describe('InterviewEditPageComponent', () => {
  let component: InterviewEditPageComponent;
  let fixture: ComponentFixture<InterviewEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewEditPageComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        InterviewsService,
        InterviewTemplatesService,
        UserLabelsService,
        OrganizationsService,
        CandidateCardsService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
