import { Injectable } from '@angular/core';
import { JoinToOrgInvitation } from '@models/organizations/join-to-org-invitation.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface InviteUserRequest {
  organizationId: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationInvitationsService {
  private readonly root = '/api/organization-invitations/';
  constructor(private readonly api: ApiService) {}

  forMe(): Observable<Array<JoinToOrgInvitation>> {
    return this.api.get<JoinToOrgInvitation[]>(this.root + 'for-me');
  }

  forOrganization(organizationId: string): Observable<Array<JoinToOrgInvitation>> {
    // for admis
    return this.api.get<JoinToOrgInvitation[]>(this.root + 'for-organization/' + organizationId);
  }

  inviteUser(request: InviteUserRequest): Observable<void> {
    return this.api.post<void>(this.root + 'invite-user', request);
  }

  delete(invitationId: string): Observable<void> {
    return this.api.delete<void>(this.root + invitationId);
  }

  accept(invitationId: string): Observable<void> {
    return this.api.post<void>(this.root + invitationId + '/accept');
  }

  reject(invitationId: string): Observable<void> {
    return this.api.post<void>(this.root + invitationId + '/reject');
  }
}
