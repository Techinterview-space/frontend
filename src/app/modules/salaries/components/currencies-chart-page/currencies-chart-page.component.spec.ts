import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CurrenciesChartPageComponent } from "./currencies-chart-page.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TitleService } from "@services/title.service";
import { CurrenciesCollectionService } from "@services/currencies-collection.service";
import { of } from "rxjs";

describe("CurrenciesChartPageComponent", () => {
  let component: CurrenciesChartPageComponent;
  let fixture: ComponentFixture<CurrenciesChartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrenciesChartPageComponent],
      providers: [
        {
          provide: TitleService,
          useValue: {
            setTitle: jasmine.createSpy("setTitle"),
            resetTitle: jasmine.createSpy("resetTitle"),
          },
        },
        {
          provide: CurrenciesCollectionService,
          useValue: {
            getChartData: jasmine.createSpy("getChartData").and.returnValue(
              of([
                {
                  weekStartDate: "2024-01-01T00:00:00Z",
                  weekEndDate: "2024-01-07T00:00:00Z",
                  averageCurrencies: [
                    { currency: 3, value: 450.5 },
                    { currency: 4, value: 490.25 },
                  ],
                },
              ]),
            ),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load chart data on init", () => {
    expect(component.chartData).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  });
});
