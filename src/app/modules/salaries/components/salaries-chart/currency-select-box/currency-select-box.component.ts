import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CurrencyData, CurrencyType } from "@services/admin-tools.service";
import { SelectItem } from "@shared/select-boxes/select-item";

@Component({
  selector: "app-currency-select-box",
  templateUrl: "./currency-select-box.component.html",
  styleUrl: "./currency-select-box.component.scss",
})
export class CurrencySelectBoxComponent implements OnInit {
  @Input()
  currencies: Array<CurrencyData> | null = null;

  @Output()
  readonly currencyDataSelected = new EventEmitter<void>();

  selectedCurrency: CurrencyType | null = null;
  currenciesAsItems: Array<SelectItem<CurrencyType>> = [];

  constructor() {}

  ngOnInit(): void {

    if (!this.currencies || this.currencies.length === 0) {
      this.currencies = [
        {
          value: 1,
          currency: CurrencyType.KZT,
          currencyString: "тг",
          pubDate: new Date(),
        },
      ];
    }

    this.currenciesAsItems = this.currencies
      .map((x) => {
        return {
          value: CurrencyType[x.currency],
          label: CurrencyType[x.currency],
          item: x.currency,
        };
      });

    this.selectedCurrency = this.currenciesAsItems[0].item;
  }

  onSelectionChange(e: SelectItem<CurrencyType>): void {

    if (e == null) {
      // clear selection
      return;
    }

    const selectedCurrencyData = this.currencies!.find(x => x.currency === e.item);
    console.log("Currency selected: ", selectedCurrencyData);
  }
}
