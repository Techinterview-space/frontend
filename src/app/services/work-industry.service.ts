import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface WorkIndustry {
  id: number;
  title: string;
  hexColorAsString: string;
}

export interface WorkIndustryAdmiDto extends WorkIndustry {
  createdById: number | null;
  createdBy: string | null;
}

export interface CreateWorkIndustryRequest {
  title: string;
  hexColor: string;
}

export interface UpdateWorkIndustryRequest extends CreateWorkIndustryRequest {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkIndusrtiesService {
  private readonly root = '/api/work-industries/';
  constructor(private readonly api: ApiService) {}

  all(): Observable<Array<WorkIndustryAdmiDto>> {
    // for admis
    return this.api.get<WorkIndustryAdmiDto[]>(this.root + 'all');
  }

  allForSelectBoxes(): Observable<Array<WorkIndustry>> {
    return this.api.get<WorkIndustry[]>(this.root + 'for-select-boxes');
  }

  byIdSimple(id: string): Observable<WorkIndustry> {
    return this.api.get<WorkIndustry>(this.root + id + '/simple');
  }

  create(data: CreateWorkIndustryRequest): Observable<number> {
    return this.api.post<number>(this.root, data);
  }

  update(data: UpdateWorkIndustryRequest): Observable<void> {
    return this.api.put<void>(this.root, data);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(this.root + id);
  }
}
