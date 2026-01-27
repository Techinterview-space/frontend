import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import {
  M2mClientModel,
  M2mClientCreateRequest,
  M2mClientCreateResponse,
  M2mClientUpdateRequest,
  M2mTokenResponse,
} from "@models/m2m-client.model";

@Injectable({
  providedIn: "root",
})
export class M2mClientsService {
  private readonly baseUrl = `${environment.resourceApiURI}/api/m2m-clients`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<M2mClientModel[]> {
    return this.http.get<M2mClientModel[]>(this.baseUrl);
  }

  getById(id: number): Observable<M2mClientModel> {
    return this.http.get<M2mClientModel>(`${this.baseUrl}/${id}`);
  }

  create(request: M2mClientCreateRequest): Observable<M2mClientCreateResponse> {
    return this.http.post<M2mClientCreateResponse>(this.baseUrl, request);
  }

  update(id: number, request: M2mClientUpdateRequest): Observable<M2mClientModel> {
    return this.http.put<M2mClientModel>(`${this.baseUrl}/${id}`, request);
  }

  updateScopes(id: number, scopes: string[]): Observable<M2mClientModel> {
    return this.http.put<M2mClientModel>(`${this.baseUrl}/${id}/scopes`, {
      scopes,
    });
  }

  regenerateSecret(id: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(
      `${this.baseUrl}/${id}/regenerate-secret`,
      {}
    );
  }

  generateToken(id: number): Observable<M2mTokenResponse> {
    return this.http.post<M2mTokenResponse>(
      `${this.baseUrl}/${id}/generate-token`,
      {}
    );
  }

  activate(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/${id}/activate`,
      {}
    );
  }

  deactivate(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/${id}/deactivate`,
      {}
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
