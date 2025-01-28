import { CurrencyData, CurrencyType } from "@services/admin-tools.service";

export class CurrencyItem implements CurrencyData {
  constructor(private readonly item: CurrencyData) {
    this.value = item.value;
    this.currency = item.currency;
    this.currencyString = CurrencyType[item.currency];
    this.pubDate = item.pubDate;
  }

  readonly value: number;
  readonly currency: CurrencyType;
  readonly currencyString: string;
  readonly pubDate: Date;
}
