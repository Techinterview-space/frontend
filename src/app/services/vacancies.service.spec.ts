import { TestBed } from "@angular/core/testing";

import { VacanciesService } from "./vacancies.service";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

describe("VacanciesService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [VacanciesService, provideHttpClient(withInterceptorsFromDi())],
    }),
  );

  it("should be created", () => {
    const service = TestBed.inject(VacanciesService);
    expect(service).toBeTruthy();
  });
});
