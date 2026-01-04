import { CurrencyRecord } from "@services/currencies-collection.service";

export class CurrencyItem implements CurrencyRecord {
  constructor(private readonly item: CurrencyRecord) {
    this.id = item.id;
    this.currencyDate = item.currencyDate;
    this.currencies = item.currencies;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;

    // Create truncated JSON string for display (15 chars)
    const jsonString = JSON.stringify(item.currencies);
    this.currenciesShort =
      jsonString.length > 15 ? jsonString.substring(0, 15) + "..." : jsonString;
    this.currenciesJson = jsonString;
  }

  readonly id: string;
  readonly currencyDate: string;
  readonly currencies: Record<string, number>;
  readonly createdAt: string;
  readonly updatedAt: string;

  // Display helpers
  readonly currenciesShort: string;
  readonly currenciesJson: string;
}
