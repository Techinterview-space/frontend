import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { LabelEntityBaseService } from "./label-entity-base.service";

@Injectable({
  providedIn: "root",
})
export class SkillsService extends LabelEntityBaseService {
  constructor(api: ApiService) {
    super("/api/skills/", api);
  }
}
