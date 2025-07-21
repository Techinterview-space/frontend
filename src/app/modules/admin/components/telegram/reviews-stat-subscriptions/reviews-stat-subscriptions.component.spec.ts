import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { CompanyReviewsStatSubscriptionsComponent } from "./reviews-stat-subscriptions.component";
import { TelegramSubscriptionsService } from "@services/telegram-subscriptions.service";
import { CompanyReviewsTelegramSubscriptionsService } from "@services/company-reviews-telegram.service";

describe("CompanyReviewsStatSubscriptionsComponent", () => {
  let component: CompanyReviewsStatSubscriptionsComponent;
  let fixture: ComponentFixture<CompanyReviewsStatSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyReviewsStatSubscriptionsComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        TelegramSubscriptionsService,
        CompanyReviewsTelegramSubscriptionsService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyReviewsStatSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
