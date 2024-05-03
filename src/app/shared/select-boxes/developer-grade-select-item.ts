import { DeveloperGrade } from "@models/enums";
import { EnumHelper } from "@shared/value-objects/enum-helper";
import { SplittedByWhitespacesString } from "@shared/value-objects/splitted-by-whitespaces-string";
import { SelectItem } from "./select-item";

export class DeveloperGradeSelectItem implements SelectItem<DeveloperGrade> {
  readonly value: string;
  readonly label: string;
  readonly item: DeveloperGrade;

  constructor(grade: DeveloperGrade, label: string | null = null) {
    this.value = grade.toString();
    this.label =
      label ?? new SplittedByWhitespacesString(DeveloperGrade[grade]).value;
    this.item = grade;
  }

  static empty(label: string): DeveloperGradeSelectItem {
    return new DeveloperGradeSelectItem(DeveloperGrade.Unknown, label);
  }

  static allGrades(): DeveloperGradeSelectItem[] {
    return EnumHelper.getValues(DeveloperGrade).map(
      (grade) => new DeveloperGradeSelectItem(grade)
    );
  }

  static gradesSimpleOnly(): DeveloperGradeSelectItem[] {
    return EnumHelper.getValues(DeveloperGrade)
      .filter(
        (grade) =>
          grade != DeveloperGrade.Unknown &&
          grade != DeveloperGrade.JuniorStrong &&
          grade != DeveloperGrade.MiddleMinus &&
          grade != DeveloperGrade.MiddleStrong &&
          grade != DeveloperGrade.SeniorMinus &&
          grade != DeveloperGrade.SeniorStrong &&
          grade != DeveloperGrade.LeadMinus &&
          grade != DeveloperGrade.LeadStrong
      )
      .map((grade) => new DeveloperGradeSelectItem(grade));
  }
}
