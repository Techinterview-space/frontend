import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CurrenciesPageComponent } from "./currencies-page.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TitleService } from "@services/title.service";
import { CurrenciesCollectionService } from "@services/currencies-collection.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { of } from "rxjs";

describe("CurrenciesPageComponent", () => {
  let component: CurrenciesPageComponent;
  let fixture: ComponentFixture<CurrenciesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrenciesPageComponent],
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
            getAll: jasmine
              .createSpy("getAll")
              .and.returnValue(of({ results: [], totalItems: 0 })),
            create: jasmine.createSpy("create"),
            delete: jasmine.createSpy("delete"),
          },
        },
        {
          provide: AlertService,
          useValue: {
            success: jasmine.createSpy("success"),
            error: jasmine.createSpy("error"),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
