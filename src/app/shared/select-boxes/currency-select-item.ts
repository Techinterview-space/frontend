import { EnumHelper } from "@shared/value-objects/enum-helper";
import { SplittedByWhitespacesString } from "@shared/value-objects/splitted-by-whitespaces-string";
import { SelectItem } from "./select-item";
import { Currency } from "@models/salaries/currency";

export class CurrencySelectItem implements SelectItem<Currency> {
  readonly value: string;
  readonly label: string;
  readonly item: Currency;

  constructor(item: Currency) {
    this.value = item.toString();
    this.label = new SplittedByWhitespacesString(Currency[item]).value;
    this.item = item;
  }

  static allItems(): CurrencySelectItem[] {
    return EnumHelper.getValues(Currency)
      .filter((x) => x !== Currency.Undefined)
      .map((grade) => new CurrencySelectItem(grade));
  }
}
