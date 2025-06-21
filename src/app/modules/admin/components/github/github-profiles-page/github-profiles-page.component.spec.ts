import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { GitHubProfilesPageComponent } from "./github-profiles-page.component";
import { GitHubAdminService } from "@services/github-admin.service";

describe("GitHubProfilesPageComponent", () => {
  let component: GitHubProfilesPageComponent;
  let fixture: ComponentFixture<GitHubProfilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GitHubProfilesPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, GitHubAdminService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitHubProfilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});