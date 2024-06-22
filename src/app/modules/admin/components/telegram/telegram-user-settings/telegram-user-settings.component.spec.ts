import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { TelegramUserSettingsComponent } from "./telegram-user-settings.component";
import { TelegramBotService } from "@services/telegram-bot.service";

describe("TelegramBotUsagesComponent", () => {
  let component: TelegramUserSettingsComponent;
  let fixture: ComponentFixture<TelegramUserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelegramUserSettingsComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, TelegramBotService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
