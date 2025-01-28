import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

export interface SetupTotpResponse {
  totpMfaUrl: string;
  totpSetupQRBase64: string;
}

export interface VerifyTotpResponse {
  result: boolean;
}

@Injectable({
  providedIn: "root",
})
export class TotpService {
  constructor(private api: ApiService) {}

  enableMfa(): Observable<SetupTotpResponse> {
    return this.api.post("/api/totp/enable");
  }

  disableMfa(): Observable<void> {
    return this.api.post("/api/totp/disable");
  }

  verifyTotp(code: string): Observable<VerifyTotpResponse> {
    return this.api.post("/api/totp/verify", { totpCode: code });
  }
}
