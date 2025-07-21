import { ComponentFixture, TestBed } from "@angular/core/testing";

import { JobPostingMessageSubscriptionsComponent } from "./job-posting-message-subscriptions.component";
import { mostUsedImports, mostUsedServices, testUtilStubs } from "@shared/test-utils";
import { TelegramSubscriptionsService } from "@services/telegram-subscriptions.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("JobPostingMessageSubscriptionsComponent", () => {
  let component: JobPostingMessageSubscriptionsComponent;
  let fixture: ComponentFixture<JobPostingMessageSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPostingMessageSubscriptionsComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        TelegramSubscriptionsService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(JobPostingMessageSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
