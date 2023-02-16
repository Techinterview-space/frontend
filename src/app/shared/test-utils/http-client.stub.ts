import { Observable } from 'rxjs';

export class HttpClientStub {
  get<T>(url: string, options: any): Observable<T> {
    return new Observable<T>();
  }
}
