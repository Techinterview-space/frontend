import { Injectable } from "@angular/core";
import { PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { GitHubProfile, GitHubChat, GitHubProcessingJob } from "@models/github";

export interface GitHubProfilesQueryParams extends PageParams {
  search: string | null;
}

export interface GitHubChatsQueryParams extends PageParams {
  search: string | null;
}

@Injectable()
export class GitHubAdminService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/github/`;
  }

  getProfiles(
    params: GitHubProfilesQueryParams,
  ): Observable<PaginatedList<GitHubProfile>> {
    const httpParams = new ConvertObjectToHttpParams(params).get();
    return this.api.get<PaginatedList<GitHubProfile>>(
      this.apiUrl + "profiles?" + httpParams,
    );
  }

  getChats(
    params: GitHubChatsQueryParams,
  ): Observable<PaginatedList<GitHubChat>> {
    const httpParams = new ConvertObjectToHttpParams(params).get();
    return this.api.get<PaginatedList<GitHubChat>>(
      this.apiUrl + "chats?" + httpParams,
    );
  }

  getProcessingJobs(): Observable<GitHubProcessingJob[]> {
    return this.api.get<GitHubProcessingJob[]>(this.apiUrl + "processing-jobs");
  }

  deleteProcessingJob(username: string): Observable<void> {
    return this.api.delete<void>(this.apiUrl + "processing-jobs/" + username);
  }

  deleteProfile(username: string): Observable<void> {
    return this.api.delete<void>(this.apiUrl + "profiles/" + username);
  }
}
