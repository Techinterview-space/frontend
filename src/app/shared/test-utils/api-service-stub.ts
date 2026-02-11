import { HttpClientStub } from "./http-client.stub";
import { ApiService, HttpOptions } from "@services/api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class ApiServiceStub extends ApiService {
  constructor() {
    super(new HttpClientStub() as HttpClient);
  }

  override get<T>(_url: string, _options?: HttpOptions): Observable<T> {
    throw Error("not implemented");
  }

  override post<T>(
    _url: string,
    _body?: any,
    _options?: HttpOptions,
  ): Observable<T> {
    throw Error("not implemented");
  }

  override put<T>(
    _url: string,
    _body: any,
    _options?: HttpOptions,
  ): Observable<T> {
    throw Error("not implemented");
  }

  override delete<T>(_url: string, _options?: HttpOptions): Observable<T> {
    throw Error("not implemented");
  }
}
