import { Injectable } from "@angular/core";
import { InterviewSubject } from "@models/interview-models/interview-subject";
import { DeveloperGrade } from "@models/enums";
import { Interview } from "@models/interview-models/interview";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Label } from "@models/user-label.model";

export interface InterviewCreateRequest {
  candidateName: string;
  overallOpinion: string | null;
  candidateGrade: DeveloperGrade | null;
  subjects: Array<InterviewSubject>;
  labels: Array<Label>;
  organizationId: string | null;
  candidateCardId: string | null;
}

export interface InterviewMarkdownRespose {
  markdown: string;
}

export interface InterviewUpdateRequest extends InterviewCreateRequest {
  id: string;
}

@Injectable()
export class InterviewsService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = `/api/interviews/`;
  }

  byId(id: string): Observable<Interview> {
    return this.api.get<Interview>(this.apiUrl + id);
  }

  markdown(id: string): Observable<InterviewMarkdownRespose> {
    return this.api.get<InterviewMarkdownRespose>(
      this.apiUrl + id + "/markdown"
    );
  }

  pdf(id: string): Observable<File> {
    const httpOptions = {
      responseType: "blob" as "json",
    };
    return this.api.get<File>(this.apiUrl + id + "/download", httpOptions);
  }

  // TODO Remove
  pdfSync(id: string): Observable<File> {
    const httpOptions = {
      responseType: "blob" as "json",
    };
    return this.api.get<File>(this.apiUrl + id + "/download-sync", httpOptions);
  }

  update(model: InterviewUpdateRequest): Observable<void> {
    return this.api.put(this.apiUrl, model);
  }

  create(model: InterviewCreateRequest): Observable<void> {
    return this.api.post(this.apiUrl, model);
  }

  delete(id: string): Observable<void> {
    return this.api.delete(this.apiUrl + id);
  }

  all(): Observable<Array<Interview>> {
    return this.api.get<Array<Interview>>(this.apiUrl);
  }

  my(): Observable<Array<Interview>> {
    return this.api.get<Array<Interview>>(this.apiUrl + "my");
  }
}
