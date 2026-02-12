import { TestBed } from "@angular/core/testing";

import { PublicSurveysService } from "./public-surveys.service";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

describe("PublicSurveysService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PublicSurveysService,
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }),
  );

  it("should be created", () => {
    const service = TestBed.inject(PublicSurveysService);
    expect(service).toBeTruthy();
  });
});
