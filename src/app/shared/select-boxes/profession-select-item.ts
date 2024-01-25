import { EnumHelper } from '@shared/value-objects/enum-helper';
import { SplittedByWhitespacesString } from '@shared/value-objects/splitted-by-whitespaces-string';
import { SelectItem } from './select-item';
import { UserProfession } from '@models/salaries/user-profession';

export class ProfessionSelectItem implements SelectItem<UserProfession> {
  readonly value: string;
  readonly label: string;
  readonly item: UserProfession;

  constructor(item: UserProfession) {
    this.value = item.toString();

    switch (item) {
      case UserProfession.UiDesigner:
        this.label = 'UI Designer';
        break;

      case UserProfession.UxDesigner:
        this.label = 'UX Designer';
        break;

      case UserProfession.UiUxDesigner:
        this.label = 'UI/UX Designer';
        break;

      case UserProfession.HrNonIt:
        this.label = 'HR (не из IT)';
        break;

      default:
        this.label = new SplittedByWhitespacesString(UserProfession[item]).value;
        break;
    }

    this.item = item;
  }

  static allItems(): ProfessionSelectItem[] {
    return EnumHelper.getValues(UserProfession)
        .filter((x) => x !== UserProfession.Undefined)
        .map((grade) => new ProfessionSelectItem(grade));
  }
}
