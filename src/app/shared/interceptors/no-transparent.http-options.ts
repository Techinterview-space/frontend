import { HttpRequest } from '@angular/common/http';
import { HttpOptions } from '@services/api.service';

export class NoTransparentHttpOptions {
  private static readonly headerKey = 'X-Request-No-Transparent';

  static readonly options: HttpOptions = {
    headers: { 'X-Request-No-Transparent': 'true' }
  };

  static hasHeader(req: HttpRequest<any>): boolean {
    return req.headers.has(NoTransparentHttpOptions.headerKey);
  }
}
