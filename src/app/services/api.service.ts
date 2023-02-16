import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// responseType?: "arraybuffer" | "json" | "blob" | "text";
// observe?: "body" | "response" | "events";

export interface HttpOptions {
  headers?: HttpHeaders | { [key: string]: string | string[] };
  params?: HttpParams | { [key: string]: string | string[] };
  responseType?: 'json';
  observe?: 'body';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export const applicationsJsonHttpOptions: HttpOptions = {
  headers: { 'Content-Type': 'application/json' }
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.resourceApiURI;
  }

  get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, options);
  }

  post<T>(url: string, body?: any, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, body, options);
  }

  put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(this.apiUrl + url, body, options);
  }

  delete<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url, options);
  }
}
