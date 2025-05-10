import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { TelegramBotService } from "@services/telegram-bot.service";
import { InlineRepliesStatsComponent } from "./inline-replies-stats.component";

describe("InlineRepliesStatsComponent", () => {
  let component: InlineRepliesStatsComponent;
  let fixture: ComponentFixture<InlineRepliesStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineRepliesStatsComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, TelegramBotService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineRepliesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
