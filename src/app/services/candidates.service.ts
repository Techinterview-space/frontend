import { Injectable } from '@angular/core';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { Candidate } from '@models/organizations/candidate.model';
import { EmploymentStatus } from '@models/organizations/employment-status.enum';
import { defaultPageParams, PageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { ConvertObjectToHttpParams } from '@shared/value-objects/convert-object-to-http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private readonly root = '/api/candidates/';
  constructor(private readonly api: ApiService) {}

  all(pagination: PageParams = defaultPageParams): Observable<PaginatedList<Candidate>> {
    // for admis
    const queryParams = new ConvertObjectToHttpParams(pagination);
    return this.api.get<PaginatedList<Candidate>>(this.root + '?' + queryParams.get());
  }

  byId(id: string): Observable<Candidate> {
    return this.api.get<Candidate>(this.root + id);
  }

  archive(id: string): Observable<void> {
    return this.api.post<void>(this.root + id + '/archive');
  }

  restore(id: string): Observable<void> {
    return this.api.post<void>(this.root + id + '/restore');
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(this.root + id);
  }
}
