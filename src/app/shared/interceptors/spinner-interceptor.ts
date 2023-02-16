import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '@shared/services/spinners/spinner-service';
import { NoTransparentHttpOptions } from './no-transparent.http-options';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly loaderService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (NoTransparentHttpOptions.hasHeader(req)) {
      this.loaderService.showTransparent();
    }

    return next.handle(req).pipe(finalize(() => this.loaderService.hideTransparent()));
  }
}
