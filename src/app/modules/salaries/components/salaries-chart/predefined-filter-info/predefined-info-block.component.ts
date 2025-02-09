import { Component, Input } from "@angular/core";
import { SalaryChartGlobalFiltersData } from "../../shared/global-filters-form-group";
import { LabelEntityDto } from "@services/label-entity.model";
import { KazakhstanCityEnum } from "@models/salaries/kazakhstan-city";
import { DeveloperGrade } from "@models/enums";

@Component({
    selector: "app-predefined-info-block",
    templateUrl: "./predefined-info-block.component.html",
    styleUrl: "./predefined-info-block.component.scss",
    standalone: false
})
export class PredefinedInfoBlockComponent {
  @Input()
  skills: Array<LabelEntityDto> = [];

  @Input()
  industries: Array<LabelEntityDto> = [];

  @Input()
  professions: Array<LabelEntityDto> = [];

  @Input()
  filterData: SalaryChartGlobalFiltersData | null = null;

  getProfessionAndGrade(): string {
    const grade = this.getGrade();
    const professions = this.getProfessions();
    return grade ? `${professions} уровня ${grade}` : professions;
  }

  getCities(): string {
    const cities = this.filterData?.cities;
    if (cities && cities.length > 0) {
      return cities.map((x) => KazakhstanCityEnum.label(x)).join(", ") || "";
    }

    return "";
  }

  getGrade(): string {
    return this.filterData?.grade ? DeveloperGrade[this.filterData.grade] : "";
  }

  getProfessions(): string {
    return this.filterData?.profsInclude
      ? this.filterData.profsInclude
          .map((x) => this.professions.find((p) => p.id === x)?.title ?? null)
          .filter((x) => x != null)
          .join(", ")
      : "";
  }
}
