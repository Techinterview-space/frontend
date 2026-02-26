import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { TelegramBotConfigurationsComponent } from "./telegram-bot-configurations.component";
import { TelegramBotService } from "@services/telegram-bot.service";

describe("TelegramBotConfigurationsComponent", () => {
  let component: TelegramBotConfigurationsComponent;
  let fixture: ComponentFixture<TelegramBotConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelegramBotConfigurationsComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, TelegramBotService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramBotConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
