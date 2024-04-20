import { Injectable } from "@angular/core";
import { ApplicationUser } from "@models/application-user";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable()
export class UsersService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/users/`;
  }

  byId(id: number): Observable<ApplicationUser> {
    return this.api.get<ApplicationUser>(this.apiUrl + id);
  }
}
