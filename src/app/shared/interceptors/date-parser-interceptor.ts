import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Iso8601Date } from '@shared/value-objects';

/**
 * Tries to convert dates written as string values into Date objects.
 * Copied from https://gist.github.com/martinobordin/39bb1fe3400a29c1078dec00ff76bba9
 * Explaiend in https://dev.to/imben1109/date-handling-in-angular-application-part-2-angular-http-client-and-ngx-datepicker-3fna
 */
@Injectable()
export class DateParserInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const body = event.body;
            this.tryConvertDates(body);
          }
        },
        (err: any) => {
          // do nothing
        }
      )
    );
  }

  // public for test purposes
  tryConvertDates(body: any): void {
    if (body == null || typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];

      const iso8601Date = new Iso8601Date(value);
      if (iso8601Date.valid()) {
        body[key] = iso8601Date.asDateOrFail();
      } else if (typeof value === 'object') {
        this.tryConvertDates(value);
      }
    }
  }
}
