import { HttpParams } from '@angular/common/http';
import Assertion from '@shared/validation/assertion';

export class ConvertObjectToHttpParams {
  private readonly params: any;

  constructor(params: any) {
    this.params = params;
  }

  get(): HttpParams {
    Assertion.notNull(this.params, 'param');

    let httpParams: HttpParams = new HttpParams();

    for (const field of Object.keys(this.params)) {
      const value = this.params[field];
      if (value == null) {
        continue;
      }

      httpParams = httpParams.append(field, value);
    }

    return httpParams;
  }
}
