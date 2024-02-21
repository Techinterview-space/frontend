import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Skill {
  id: number;
  title: string;
  hexColorAsString: string;
}

export interface SkillAdmiDto extends Skill {
  createdById: number | null;
  createdBy: string | null;
}

export interface CreateSkillRequest {
  title: string;
  hexColor: string;
}

export interface UpdateSkillRequest extends CreateSkillRequest {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private readonly root = '/api/skills/';
  constructor(private readonly api: ApiService) {}

  all(): Observable<Array<SkillAdmiDto>> {
    // for admis
    return this.api.get<SkillAdmiDto[]>(this.root + 'all');
  }

  allForSelectBoxes(): Observable<Array<Skill>> {
    return this.api.get<Skill[]>(this.root + 'for-select-boxes');
  }

  create(data: CreateSkillRequest): Observable<number> {
    return this.api.post<number>(this.root, data);
  }

  update(data: UpdateSkillRequest): Observable<void> {
    return this.api.put<void>(this.root, data);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(this.root + id);
  }
}
