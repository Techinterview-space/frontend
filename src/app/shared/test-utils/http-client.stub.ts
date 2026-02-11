import { Observable } from "rxjs";

export class HttpClientStub {
  get<T>(_url: string, _options: any): Observable<T> {
    return new Observable<T>();
  }
}
