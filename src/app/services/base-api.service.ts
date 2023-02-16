import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

export abstract class BaseApiService<TModel> {
  protected readonly apiUrl: string;

  constructor(protected readonly api: ApiService, private readonly resourceUrlPart: string) {
    // TODO Maxim: validate resourceUrlPart
    this.apiUrl = `/api/${this.resourceUrlPart}/`;
  }

  getById(id: number): Observable<TModel> {
    return this.api.get<TModel>(this.apiUrl + id);
  }

  update(model: TModel): Observable<void> {
    return this.api.put(this.apiUrl, model);
  }

  create(model: TModel): Observable<void> {
    return this.api.post(this.apiUrl, model);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(this.apiUrl + id);
  }

  getAll(): Observable<Array<TModel>> {
    return this.api.get<Array<TModel>>(this.apiUrl);
  }
}
