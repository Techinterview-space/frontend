import { Injectable } from "@angular/core";
import { Label } from "@models/user-label.model";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable()
export class UserLabelsService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/user-labels/`;
  }

  my(): Observable<Array<Label>> {
    return this.api.get<Array<Label>>(this.apiUrl + "my");
  }

  /** For Admin */
  empty(): Observable<Array<Label>> {
    return this.api.get<Array<Label>>(this.apiUrl + "empty");
  }

  update(model: Label): Observable<void> {
    return this.api.put(this.apiUrl, model);
  }

  create(model: Label): Observable<void> {
    return this.api.post(this.apiUrl, model);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(this.apiUrl + id);
  }
}
