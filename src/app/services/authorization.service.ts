import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApplicationUser } from "../models";
import { ApiService } from "./api.service";

export interface CheckTotpResponse {
  id: number;
  email: string;
  isMfaEnabled: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthorizationService {
  constructor(private api: ApiService) {}

  getMe(): Observable<ApplicationUser> {
    return this.api.get("/api/account/me");
  }

  checkTotpRequired(): Observable<CheckTotpResponse> {
    return this.api.get("/api/account/check-totp");
  }
}
