import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

export interface SendCustomEmailRequest {
  to: string;
  cc?: string;
  from: string;
  subject: string;
  htmlBody: string;
}

export interface SendCustomEmailResponse {
  success: boolean;
  message: string;
}

@Injectable()
export class AdminEmailService {
  private readonly apiUrl = "/api/admin/emails/";

  constructor(private readonly api: ApiService) {}

  sendEmail(request: SendCustomEmailRequest): Observable<SendCustomEmailResponse> {
    return this.api.post<SendCustomEmailResponse>(this.apiUrl + "send", request);
  }
}
