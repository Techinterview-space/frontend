import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OpenAiPromptsAdminPageComponent } from "./openai-prompts-admin-page.component";

describe("OpenAiPromptsAdminPageComponent", () => {
  let component: OpenAiPromptsAdminPageComponent;
  let fixture: ComponentFixture<OpenAiPromptsAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenAiPromptsAdminPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenAiPromptsAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
