import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { ServerUnavailableComponent } from "./server-unavailable.component";
import { mostUsedImports } from "@shared/test-utils";
import { mostUsedServices, testUtilStubs } from "@shared/test-utils";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ServerUnavailableComponent", () => {
  let component: ServerUnavailableComponent;
  let fixture: ComponentFixture<ServerUnavailableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServerUnavailableComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
