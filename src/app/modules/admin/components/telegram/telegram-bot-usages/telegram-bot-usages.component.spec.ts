import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { TelegramBotUsagesComponent } from "./telegram-bot-usages.component";
import { TelegramBotService } from "@services/telegram-bot.service";

describe("TelegramBotUsagesComponent", () => {
  let component: TelegramBotUsagesComponent;
  let fixture: ComponentFixture<TelegramBotUsagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelegramBotUsagesComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, TelegramBotService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramBotUsagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
