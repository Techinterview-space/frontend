import { DeveloperGrade } from '@models/enums';
import { EnumHelper } from '@shared/value-objects/enum-helper';
import { SplittedByWhitespacesString } from '@shared/value-objects/splitted-by-whitespaces-string';
import { SelectItem } from './select-item';

export class DeveloperGradeSelectItem implements SelectItem<DeveloperGrade> {
  readonly value: string;
  readonly label: string;
  readonly item: DeveloperGrade;

  constructor(grade: DeveloperGrade) {
    this.value = grade.toString();
    this.label = new SplittedByWhitespacesString(DeveloperGrade[grade]).value;
    this.item = grade;
  }

  static allGrades(): DeveloperGradeSelectItem[] {
    return EnumHelper.getValues(DeveloperGrade).map((grade) => new DeveloperGradeSelectItem(grade));
  }
}
