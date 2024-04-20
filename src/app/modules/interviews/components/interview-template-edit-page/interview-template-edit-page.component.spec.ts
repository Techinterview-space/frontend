import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InterviewTemplatesService } from "@services/interview-templates.service";
import { UserLabelsService } from "@services/user-labels.service";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { InterviewTemplateEditPageComponent } from "./interview-template-edit-page.component";

describe("InterviewTemplateEditPageComponent", () => {
  let component: InterviewTemplateEditPageComponent;
  let fixture: ComponentFixture<InterviewTemplateEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewTemplateEditPageComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        InterviewTemplatesService,
        UserLabelsService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewTemplateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
