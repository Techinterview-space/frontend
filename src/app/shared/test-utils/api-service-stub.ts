import { HttpClientStub } from './http-client.stub';
import { ApiService, HttpOptions } from '@services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiServiceStub extends ApiService {
  constructor() {
    super(new HttpClientStub() as HttpClient);
  }

  get<T>(url: string, options?: HttpOptions): Observable<T> {
    throw Error('not implemented');
  }

  post<T>(url: string, body?: any, options?: HttpOptions): Observable<T> {
    throw Error('not implemented');
  }

  put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    throw Error('not implemented');
  }

  delete<T>(url: string, options?: HttpOptions): Observable<T> {
    throw Error('not implemented');
  }
}
