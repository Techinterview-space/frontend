import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of, throwError, BehaviorSubject } from "rxjs";
import { Injector, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { z } from "zod";
import { AuthService } from "../services/auth/auth.service";
import { catchError, tap, switchMap, filter, take } from "rxjs/operators";
import { AlertService } from "@shared/components/alert/services/alert.service";

const BackendErrorSchema = z.object({
  Status: z.number(),
  ExceptionType: z.string(),
  InnerExceptionMessage: z.string().nullable(),
  Message: z.string(),
  RequestId: z.string(),
  StackTrace: z.string().nullable(),
});

type BackendError = z.infer<typeof BackendErrorSchema>;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthService | null = null;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(
    private readonly injector: Injector,
    private readonly router: Router,
    private readonly alertService: AlertService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.authService == null) {
      const authService = this.injector.get(AuthService);

      if (authService == null) {
        throw Error("Cannot work without Auth Service");
      }

      this.authService = authService;
    }

    const request = this.addBearerTokenToHeader(req);

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => this.processHttpEvent(event),
        (error: any) => {
          // Only process non-401 errors here
          if (!(error instanceof HttpErrorResponse && error.status === 401)) {
            this.processHttpErrors(error);
          }
        },
      ),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isAuthEndpoint(req.url)) {
          return this.handle401Error(req, next);
        }

        if (error.status === 0) {
          this.router.navigateByUrl("server-unavailable");
          return of(error as any);
        }

        return throwError(() => error);
      }),
    );
  }

  private isAuthEndpoint(url: string): boolean {
    return (
      url.includes("/api/auth/refresh") ||
      url.includes("/api/auth/login") ||
      url.includes("/api/auth/logout")
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService!.refreshToken().pipe(
        switchMap((token: string) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);

          if (token) {
            return next.handle(this.addBearerTokenToHeader(req, token));
          }

          // No token received, logout
          this.authService!.signout();
          this.router.navigate(["/"]);
          return throwError(() => new Error("Session expired"));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService!.signout();
          this.router.navigate(["/"]);
          return throwError(() => err);
        }),
      );
    }

    // If refresh is already in progress, wait for it to complete
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        return next.handle(this.addBearerTokenToHeader(req, token!));
      }),
    );
  }

  private processHttpErrors(error: any): void {
    if (
      error instanceof HttpErrorResponse &&
      this.processHttpErrorResponse(error)
    ) {
      return;
    }

    this.alertService.error(error.message);
  }

  private checkIsNotAuthorizeError(error: HttpErrorResponse): boolean {
    const notAuthStatusCode = 401;
    if (error.status === notAuthStatusCode) {
      return true;
    }

    if (
      error.status === 0 &&
      error.url != null &&
      error.url.endsWith("/health")
    ) {
      return false;
    }

    const headersStatus = error.headers.get("status");
    return headersStatus != null && Number(headersStatus) === notAuthStatusCode;
  }

  private processHttpErrorResponse(error: HttpErrorResponse): boolean {
    // 401 errors are handled by handle401Error
    if (this.checkIsNotAuthorizeError(error)) {
      return true;
    }

    // permissions error
    if (error.status === 403) {
      this.router.navigate(["no-permission"]);
      return true;
    }

    // bad request error
    if (error.status === 400) {
      if (error.error != null) {
        const backendError = error.error as BackendError;

        if (backendError != null && backendError.Message) {
          this.alertService.error(backendError.Message);
          return true;
        }

        console.error(error.error);
        this.alertService.error("Unexpected error from backend");
        return true;
      }

      this.alertService.error("Request data is invalid");
      return true;
    }

    return false;
  }

  private processHttpEvent(_event: HttpEvent<any>): void {
    // do nothing
  }

  private addBearerTokenToHeader(
    req: HttpRequest<any>,
    token?: string,
  ): HttpRequest<any> {
    const authToken = token || this.authService!.getAuthorizationHeaderValue();
    if (authToken) {
      const headerValue = token ? `Bearer ${token}` : authToken;
      req = req.clone({ setHeaders: { Authorization: headerValue } });
    }

    return req;
  }
}
