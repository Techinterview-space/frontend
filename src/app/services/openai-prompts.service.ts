import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {
  OpenAiPrompt,
  OpenAiPromptCreateRequest,
  OpenAiPromptUpdateRequest,
} from "@models/openai-prompt.model";

@Injectable()
export class OpenAiPromptsService {
  private readonly apiUrl: string;

  constructor(private readonly api: ApiService) {
    this.apiUrl = "/api/openai-prompts/";
  }

  getAll(): Observable<Array<OpenAiPrompt>> {
    return this.api.get<Array<OpenAiPrompt>>(this.apiUrl);
  }

  create(model: OpenAiPromptCreateRequest): Observable<void> {
    return this.api.post(this.apiUrl, model);
  }

  update(model: OpenAiPromptUpdateRequest): Observable<void> {
    return this.api.post(this.apiUrl + "update", model);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(this.apiUrl + id);
  }
}