import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  CreateLabelEntityRequest,
  LabelEntityAdmiDto,
  LabelEntityDto,
  UpdateLabelEntityRequest,
} from "./label-entity.model";

export abstract class LabelEntityBaseService {
  constructor(
    private readonly root: string,
    private readonly api: ApiService,
  ) {}

  all(): Observable<Array<LabelEntityAdmiDto>> {
    // for admis
    return this.api.get<LabelEntityAdmiDto[]>(this.root + "all");
  }

  allForSelectBoxes(): Observable<Array<LabelEntityDto>> {
    return this.api.get<LabelEntityDto[]>(this.root + "for-select-boxes");
  }

  byIdSimple(id: string): Observable<LabelEntityDto> {
    return this.api.get<LabelEntityDto>(this.root + id + "/simple");
  }

  create(data: CreateLabelEntityRequest): Observable<number> {
    return this.api.post<number>(this.root, data);
  }

  update(data: UpdateLabelEntityRequest): Observable<void> {
    return this.api.put<void>(this.root, data);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(this.root + id);
  }
}
