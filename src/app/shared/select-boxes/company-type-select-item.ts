import { EnumHelper } from '@shared/value-objects/enum-helper';
import { SplittedByWhitespacesString } from '@shared/value-objects/splitted-by-whitespaces-string';
import { SelectItem } from './select-item';
import { CompanyType } from '@models/salaries/company-type';

export class CompanyTypeSelectItem implements SelectItem<CompanyType> {
  readonly value: string;
  readonly label: string;
  readonly item: CompanyType;

  constructor(item: CompanyType) {
    this.value = item.toString();
    
    switch (item) {
      case CompanyType.Local:
        this.label = 'Казахстанская';
        break;
      case CompanyType.Remote:
        this.label = 'Удаленно на иностранную компанию';
        break;
      default:
        this.label = new SplittedByWhitespacesString(CompanyType[item]).value;
        break;
    }

    this.item = item;
  }

  static allItems(): CompanyTypeSelectItem[] {
    return EnumHelper.getValues(CompanyType)
      .filter((x) => x !== CompanyType.Undefined)
      .map((grade) => new CompanyTypeSelectItem(grade));
  }
}
