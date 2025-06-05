import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { UnsibscribeMeComponent } from "./unsubscribe-me.component";
import { mostUsedImports } from "@shared/test-utils";
import { mostUsedServices, testUtilStubs } from "@shared/test-utils";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("UnsibscribeMeComponent", () => {
  let component: UnsibscribeMeComponent;
  let fixture: ComponentFixture<UnsibscribeMeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnsibscribeMeComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsibscribeMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
