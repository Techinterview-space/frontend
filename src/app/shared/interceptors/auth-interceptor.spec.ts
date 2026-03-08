import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Injector } from "@angular/core";
import { AuthInterceptor } from "./auth-interceptor";
import { AuthService } from "../services/auth/auth.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { of, throwError } from "rxjs";

describe("AuthInterceptor", () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj("AuthService", [
      "getAuthorizationHeaderValue",
      "refreshToken",
      "signout",
    ]);
    routerSpy = jasmine.createSpyObj("Router", ["navigate", "navigateByUrl"]);
    const alertServiceSpy = jasmine.createSpyObj("AlertService", ["error"]);

    authServiceSpy.getAuthorizationHeaderValue.and.returnValue(
      "Bearer test-token",
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AlertService, useValue: alertServiceSpy },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should retry request after successful 401 refresh", (done) => {
    authServiceSpy.refreshToken.and.returnValue(of("new-token"));

    httpClient.get("/api/test").subscribe((response) => {
      expect(response).toEqual({ data: "ok" });
      done();
    });

    const req1 = httpMock.expectOne("/api/test");
    req1.flush(null, { status: 401, statusText: "Unauthorized" });

    const req2 = httpMock.expectOne("/api/test");
    expect(req2.request.headers.get("Authorization")).toBe("Bearer new-token");
    req2.flush({ data: "ok" });
  });

  it("should not hang concurrent requests when refresh fails", (done) => {
    authServiceSpy.refreshToken.and.returnValue(
      throwError(() => new Error("Refresh failed")),
    );

    let errorCount = 0;
    const onError = () => {
      errorCount++;
      if (errorCount === 2) {
        expect(authServiceSpy.signout).toHaveBeenCalled();
        done();
      }
    };

    httpClient.get("/api/test1").subscribe({
      error: onError,
    });
    httpClient.get("/api/test2").subscribe({
      error: onError,
    });

    const req1 = httpMock.expectOne("/api/test1");
    const req2 = httpMock.expectOne("/api/test2");

    req1.flush(null, { status: 401, statusText: "Unauthorized" });
    req2.flush(null, { status: 401, statusText: "Unauthorized" });
  });
});
