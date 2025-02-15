import { TestBed } from "@angular/core/testing";

import { ApiService } from "./api.service";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

describe("ApiService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }),
  );

  it("should be created", () => {
    const service = TestBed.inject(ApiService);
    expect(service).toBeTruthy();
  });
});
