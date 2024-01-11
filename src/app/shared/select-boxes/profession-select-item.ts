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
    this.label = new SplittedByWhitespacesString(UserProfession[item]).value;
    this.item = item;
  }

  static allItems(): ProfessionSelectItem[] {
    return EnumHelper.getValues(UserProfession)
        .filter((x) => x !== UserProfession.Undefined)
        .map((grade) => new ProfessionSelectItem(grade));
  }
}
