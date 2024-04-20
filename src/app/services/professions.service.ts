import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { LabelEntityBaseService } from "./label-entity-base.service";

@Injectable({
  providedIn: "root",
})
export class ProfessionsService extends LabelEntityBaseService {
  constructor(api: ApiService) {
    super("/api/professions/", api);
  }
}
