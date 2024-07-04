import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";
import { TelegramBotABoutComponent } from "./telegram-bot.component";

describe("TelegramBotABoutComponent", () => {
  let component: TelegramBotABoutComponent;
  let fixture: ComponentFixture<TelegramBotABoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelegramBotABoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramBotABoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
