import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { GitHubJobsPageComponent } from "./github-jobs-page.component";
import { GitHubAdminService } from "@services/github-admin.service";

describe("GitHubJobsPageComponent", () => {
  let component: GitHubJobsPageComponent;
  let fixture: ComponentFixture<GitHubJobsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GitHubJobsPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, GitHubAdminService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitHubJobsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});