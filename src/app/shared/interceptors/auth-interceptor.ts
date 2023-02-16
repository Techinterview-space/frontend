import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injector, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from '@shared/components/alert/services/alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthService | null = null;

  constructor(
    private readonly injector: Injector,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService == null) {
      const authService = this.injector.get(AuthService);

      if (authService == null) {
        throw Error('Cannot work without Auth Service');
      }

      this.authService = authService;
    }

    const request = this.addBearerTokenToHeader(req);

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => this.processHttpEvent(event),
        (error: any) => this.processHttpErrors(error)
      ),
      // @ts-ignore
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 0) {
          this.router.navigateByUrl('server-unavailable');
          return of(err as any);
        }
      })
    );
  }

  private processHttpErrors(error: any): void {
    if (error instanceof HttpErrorResponse && this.processHttpErrorResponse(error)) {
      return;
    }

    this.alertService.error(error.message);
  }

  private checkIsNotAuthorizeError(error: HttpErrorResponse): boolean {
    const notAuthStatusCode = 401;
    console.log(error);
    if (error.status === notAuthStatusCode) {
      return true;
    }

    const headersStatus = error.headers.get('status');
    return headersStatus != null && Number(headersStatus) === notAuthStatusCode;
  }

  private processHttpErrorResponse(error: HttpErrorResponse): boolean {
    // unauthorized
    if (this.checkIsNotAuthorizeError(error)) {
      this.authService!.signout();
      this.router.navigate(['/']);
      return true;
    }

    // permissions error
    if (error.status === 403) {
      this.router.navigate(['not-permission']);
      return true;
    }

    // bad request error
    if (error.status === 400) {
      if (error.error != null) {
        const errorMessageAsText = error.error as string;
        const backendMessage = errorMessageAsText ??
          error.error.Message ??
          error.error.message ??
          null;

        if (backendMessage != null) {
          this.alertService.error(backendMessage);
          return true;
        }
      }

      this.alertService.error('Request data is invalid');
      return true;
    }

    return false;
  }

  private processHttpEvent(event: HttpEvent<any>): void {
    // do nothing
  }

  private addBearerTokenToHeader(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService!.getAuthorizationHeaderValue();
    if (token != null) {
      req = req.clone({ setHeaders: { Authorization: token } });
    }

    return req;
  }
}
