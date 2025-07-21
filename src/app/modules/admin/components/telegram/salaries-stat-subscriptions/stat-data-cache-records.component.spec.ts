import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { StatDataCacheRecordsComponent } from "./stat-data-cache-records.component";
import { TelegramSubscriptionsService } from "@services/telegram-subscriptions.service";

describe("StatDataCacheRecordsComponent", () => {
  let component: StatDataCacheRecordsComponent;
  let fixture: ComponentFixture<StatDataCacheRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatDataCacheRecordsComponent],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs,
        ...mostUsedServices,
        TelegramSubscriptionsService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatDataCacheRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
