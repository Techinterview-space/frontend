import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  mostUsedImports,
  testUtilStubs,
  mostUsedServices,
} from "@shared/test-utils";
import { GitHubChatsPageComponent } from "./github-chats-page.component";
import { GitHubAdminService } from "@services/github-admin.service";

describe("GitHubChatsPageComponent", () => {
  let component: GitHubChatsPageComponent;
  let fixture: ComponentFixture<GitHubChatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GitHubChatsPageComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, GitHubAdminService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitHubChatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});