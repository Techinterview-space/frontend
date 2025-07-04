import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OpenAiPromptsAdminPageComponent } from "./openai-prompts-admin-page.component";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { OpenAiPromptsService } from "@services/openai-prompts.service";

describe("OpenAiPromptsAdminPageComponent", () => {
  let component: OpenAiPromptsAdminPageComponent;
  let fixture: ComponentFixture<OpenAiPromptsAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenAiPromptsAdminPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, OpenAiPromptsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenAiPromptsAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
