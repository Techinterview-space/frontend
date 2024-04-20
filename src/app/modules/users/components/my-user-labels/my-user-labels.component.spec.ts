import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserLabelsService } from "@services/user-labels.service";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";

import { MyUserLabelsComponent } from "./my-user-labels.component";

describe("MyUserLabelsComponent", () => {
  let component: MyUserLabelsComponent;
  let fixture: ComponentFixture<MyUserLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyUserLabelsComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, UserLabelsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyUserLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
