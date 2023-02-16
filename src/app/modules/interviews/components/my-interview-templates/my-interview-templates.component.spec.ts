import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewTemplatesService } from '@services/interview-templates.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { MyInterviewTemplatesComponent } from './my-interview-templates.component';

describe('MyInterviewTemplatesComponent', () => {
  let component: MyInterviewTemplatesComponent;
  let fixture: ComponentFixture<MyInterviewTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyInterviewTemplatesComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, InterviewTemplatesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInterviewTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
