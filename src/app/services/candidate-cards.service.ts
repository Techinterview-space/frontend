import { Injectable } from '@angular/core';
import { CandidateCard } from '@models/organizations/candidate-card.model';
import { Candidate } from '@models/organizations/candidate.model';
import { EmploymentStatus } from '@models/organizations/employment-status.enum';
import { defaultPageParams, PageParams } from '@models/page-params';
import { PaginatedList } from '@models/paginated-list';
import { Label } from '@models/user-label.model';
import { ConvertObjectToHttpParams } from '@shared/value-objects/convert-object-to-http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CandidateCardsFilterRequest } from './requests/candidate-cards-filters';
export interface EditCandidateCardEmploymentStatusRequest {
  employmentStatus: EmploymentStatus;
  organizationId: string | null;
}

export interface EditCandidateCardRequest extends EditCandidateCardEmploymentStatusRequest {
  candidateId: string | null;
  candidateFirstName: string;
  candidateLastName: string;
  candidateContacts: string | null;
  labels: Array<Label>;
}

export interface AddCommentRequest {
  comment: string;
  candidateCardId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CandidateCardsService {
  private readonly root = '/api/candidate-cards/';
  constructor(private readonly api: ApiService) {}

  all(pagination: PageParams = defaultPageParams): Observable<PaginatedList<CandidateCard>> {
    // for admis
    const queryParams = new ConvertObjectToHttpParams(pagination);
    return this.api.get<PaginatedList<CandidateCard>>(this.root + '?' + queryParams.get());
  }

  forOrganization(organizationId: string, request: CandidateCardsFilterRequest): Observable<Array<CandidateCard>> {
    const queryParams = new ConvertObjectToHttpParams(request);
    return this.api.get<Array<CandidateCard>>(this.root + 'organization/' + organizationId + '?' + queryParams.get());
  }

  getAvailableCandidates(organizationId: string): Observable<Array<Candidate>> {
    return this.api.get<Array<Candidate>>(this.root + 'organization/' + organizationId + '/available-candidates');
  }

  byId(id: string): Observable<CandidateCard> {
    return this.api.get<CandidateCard>(this.root + id);
  }

  create(request: EditCandidateCardRequest): Observable<CandidateCard> {
    return this.api.post<CandidateCard>(this.root, request);
  }

  update(card: CandidateCard, request: EditCandidateCardRequest): Observable<CandidateCard> {
    return this.api.put<CandidateCard>(this.root + card.id, request);
  }

  updateStatus(card: CandidateCard, request: EditCandidateCardEmploymentStatusRequest): Observable<EmploymentStatus> {
    return this.api.put<EmploymentStatus>(this.root + card.id + '/status', request);
  }

  archive(id: string): Observable<void> {
    return this.api.post<void>(this.root + id + '/archive');
  }

  restore(id: string): Observable<void> {
    return this.api.post<void>(this.root + id + '/restore');
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(this.root + id);
  }

  addComment(cardId: string, request: AddCommentRequest): Observable<void> {
    return this.api.post<void>(this.root + cardId + '/comment', request);
  }

  deleteComment(cardId: string, commentId: number): Observable<void> {
    return this.api.delete<void>(this.root + `${cardId}/comment/${commentId}`);
  }
}
