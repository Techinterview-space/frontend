import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewTemplatesService } from '@services/interview-templates.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { InterviewTemplatesAdminPageComponent } from './interview-templates-admin-page.component';

describe('InterviewTemplatesAdminPageComponent', () => {
  let component: InterviewTemplatesAdminPageComponent;
  let fixture: ComponentFixture<InterviewTemplatesAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewTemplatesAdminPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, InterviewTemplatesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewTemplatesAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
