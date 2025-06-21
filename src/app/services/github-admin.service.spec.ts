import { TestBed } from "@angular/core/testing";
import { GitHubAdminService } from "./github-admin.service";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

describe("GitHubAdminService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }),
  );

  it("should be created", () => {
    const service = TestBed.inject(GitHubAdminService);
    expect(service).toBeTruthy();
  });
});