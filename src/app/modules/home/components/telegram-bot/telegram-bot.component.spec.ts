import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ViewportScroller } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

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
  let mockActivatedRoute: any;
  let mockViewportScroller: jasmine.SpyObj<ViewportScroller>;

  beforeEach(async () => {
    const viewportScrollerSpy = jasmine.createSpyObj('ViewportScroller', [
      'scrollToAnchor',
    ]);
    
    mockActivatedRoute = {
      fragment: of(null),
      paramMap: of(new Map()),
      queryParams: of({}),
      snapshot: { fragment: "" }
    };

    await TestBed.configureTestingModule({
      declarations: [TelegramBotABoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [...mostUsedImports],
      providers: [
        ...testUtilStubs.filter(provider => provider.provide !== ActivatedRoute),
        ...mostUsedServices,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ViewportScroller, useValue: viewportScrollerSpy },
      ],
    }).compileComponents();

    mockViewportScroller = TestBed.inject(ViewportScroller) as jasmine.SpyObj<ViewportScroller>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramBotABoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should scroll to anchor when fragment is provided", (done) => {
    const testFragment = 'techinterview-salary-assistant-header';
    mockActivatedRoute.fragment = of(testFragment);
    
    component.ngOnInit();
    
    setTimeout(() => {
      expect(mockViewportScroller.scrollToAnchor).toHaveBeenCalledWith(testFragment);
      done();
    }, 150);
  });

  it("should not scroll when no fragment is provided", () => {
    mockActivatedRoute.fragment = of(null);
    
    component.ngOnInit();
    
    expect(mockViewportScroller.scrollToAnchor).not.toHaveBeenCalled();
  });
});
