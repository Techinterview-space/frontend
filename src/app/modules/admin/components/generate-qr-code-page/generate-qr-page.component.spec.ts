import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  mostUsedImports,
  mostUsedServices,
  testUtilStubs,
} from "@shared/test-utils";

import { AdminToolsService } from "@services/admin-tools.service";
import { GenerateQrPageComponent } from "./generate-qr-page.component";

describe("GenerateQrPageComponent", () => {
  let component: GenerateQrPageComponent;
  let fixture: ComponentFixture<GenerateQrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateQrPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, AdminToolsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateQrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
