import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  OpenAiPrompt,
  OpenAiPromptEditRequest,
} from "@models/openai-prompt.model";

@Injectable()
export class OpenAiPromptsService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = "/api/admin/ai-prompts";
  }

  getAll(): Observable<Array<OpenAiPrompt>> {
    return this.api.get<Array<OpenAiPrompt>>(this.apiUrl);
  }

  create(model: OpenAiPromptEditRequest): Observable<void> {
    return this.api.post(this.apiUrl, model);
  }

  update(id: string, model: OpenAiPromptEditRequest): Observable<void> {
    return this.api.put(this.apiUrl + "/" + id, model);
  }

  activate(id: string): Observable<void> {
    return this.api.put(this.apiUrl + "/" + id + "/activate", null);
  }

  deactivate(id: string): Observable<void> {
    return this.api.put(this.apiUrl + "/" + id + "/deactivate", null);
  }

  delete(id: string): Observable<void> {
    return this.api.delete(this.apiUrl + id);
  }
}
