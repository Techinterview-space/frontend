import { Injectable } from "@angular/core";
import { ApplicationUser } from "@models/application-user";
import { UserRole } from "@models/enums";
import { defaultPageParams, PageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { ConvertObjectToHttpParams } from "@shared/value-objects/convert-object-to-http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

export interface UpdateUserRolesRequest {
  id: number;
  roles: Array<UserRole>;
}

@Injectable()
export class UserAdminService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/admin/users/`;
  }

  byId(id: number): Observable<ApplicationUser> {
    return this.api.get<ApplicationUser>(this.apiUrl + id);
  }

  all(
    pageParams: PageParams = defaultPageParams
  ): Observable<PaginatedList<ApplicationUser>> {
    return this.api.get<PaginatedList<ApplicationUser>>(
      this.apiUrl + "?" + new ConvertObjectToHttpParams(pageParams).get()
    );
  }

  updateRoles(request: UpdateUserRolesRequest): Observable<void> {
    return this.api.put<void>(this.apiUrl + "roles", request);
  }
}
