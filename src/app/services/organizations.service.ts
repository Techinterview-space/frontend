import { Injectable } from '@angular/core';
import { Interview, InterviewTemplate } from '@models/interview-models';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { Candidate } from '@models/organizations/candidate.model';
import { Organization } from '@models/organizations/organization.model';
import { defaultPageParams, PageParams } from '@models/page-params';
import { PaginatedList, PaginatedModel } from '@models/paginated-list';
import { SelectBoxItem } from '@models/select-box-item';
import { ConvertObjectToHttpParams } from '@shared/value-objects/convert-object-to-http';
import { createReadStream } from 'fs';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CandidateCardsFilterPaginatedRequest } from './requests/candidate-cards-filters';

export interface CreateOrganizationRequest {
  name: string;
  description: string | null;
}

export interface UpdateOrganizationRequest extends CreateOrganizationRequest {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private readonly root = '/api/organizations/';
  constructor(private readonly api: ApiService) {}

  all(): Observable<Array<Organization>> {
    // for admis
    return this.api.get<Organization[]>(this.root);
  }

  allForSelectBoxes(): Observable<Array<SelectBoxItem<string>>> {
    // for admis
    return this.api.get<SelectBoxItem<string>[]>(this.root + 'for-select-boxes');
  }

  my(): Observable<Array<Organization>> {
    return this.api.get<Organization[]>(this.root + 'my');
  }

  myForSelectBoxes(): Observable<Array<Organization>> {
    return this.api.get<Organization[]>(this.root + 'my/for-select-boxes');
  }

  createdByMe(): Observable<Array<Organization>> {
    // for admis
    return this.api.get<Organization[]>(this.root + 'created-by-me');
  }

  byId(id: string): Observable<Organization> {
    return this.api.get<Organization>(this.root + id);
  }

  byIdSimple(id: string): Observable<Organization> {
    return this.api.get<Organization>(this.root + id + '/simple');
  }

  create(organization: CreateOrganizationRequest): Observable<Organization> {
    return this.api.post<Organization>(this.root, organization);
  }

  update(organization: UpdateOrganizationRequest): Observable<Organization> {
    return this.api.put<Organization>(this.root, organization);
  }

  leave(id: string): Observable<void> {
    return this.api.post<void>(this.root + id + '/leave');
  }

  attachUserToOrganization(organizationId: string, userId: number): Observable<void> {
    // for admin
    return this.api.post<void>(this.root + organizationId + '/attach-user/' + userId);
  }

  excludeUserFromOrganization(organizationId: string, userId: number): Observable<void> {
    return this.api.post<void>(this.root + organizationId + '/exclude-user/' + userId);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(this.root + id);
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(this.root + id + '/remove');
  }

  interviewTemplates(organizationId: string, request: PageParams): Observable<PaginatedList<InterviewTemplate>> {
    const params = new ConvertObjectToHttpParams(request).get();
    return this.api.get<PaginatedList<InterviewTemplate>>(
      this.root + `${organizationId}/interview-templates/?${params}`
    );
  }

  interviews(organizationId: string, request: PageParams): Observable<PaginatedList<Interview>> {
    const params = new ConvertObjectToHttpParams(request).get();
    return this.api.get<PaginatedList<Interview>>(this.root + `${organizationId}/interviews/?${params}`);
  }

  cadnidateCards(
    organizationId: string,
    request: CandidateCardsFilterPaginatedRequest
  ): Observable<PaginatedList<CandidateCard>> {
    const queryParams = new ConvertObjectToHttpParams(request);
    return this.api.get<PaginatedList<CandidateCard>>(
      this.root + organizationId + '/candidate-cards/?' + queryParams.get()
    );
  }

  cadnidates(organizationId: string, request: PageParams = defaultPageParams): Observable<PaginatedList<Candidate>> {
    const queryParams = new ConvertObjectToHttpParams(request);
    return this.api.get<PaginatedList<Candidate>>(this.root + organizationId + '/candidates/?' + queryParams.get());
  }
}
