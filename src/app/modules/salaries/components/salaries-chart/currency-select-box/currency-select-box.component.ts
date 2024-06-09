import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CurrencyData, CurrencyType } from "@services/admin-tools.service";
import { SelectItem } from "@shared/select-boxes/select-item";
import { SalariesChart } from "../salaries-chart";

@Component({
  selector: "app-currency-select-box",
  templateUrl: "./currency-select-box.component.html",
  styleUrl: "./currency-select-box.component.scss",
})
export class CurrencySelectBoxComponent implements OnInit {

  @Input()
  chart: SalariesChart | null = null;

  @Output()
  readonly currencyDataSelected = new EventEmitter<void>();

  selectedCurrency: CurrencyType | null = null;
  currenciesAsItems: Array<SelectItem<CurrencyType>> = [];
  currencies: Array<CurrencyData> | null = null;
  currencyDate: Date | null = null;

  constructor() {}

  ngOnInit(): void {

    if (!this.chart) {
      return;
    }

    this.currencies = this.chart.currencies;
    if (this.currencies.length === 0) {
      this.currencies.push(
        {
          value: 1,
          currency: CurrencyType.KZT,
          currencyString: "тг",
          pubDate: new Date(),
        }
      );
    }

    this.currenciesAsItems = this.currencies
      .map((x) => {
        return {
          value: CurrencyType[x.currency],
          label: x.currency === CurrencyType.KZT
            ? CurrencyType[x.currency]
            : `${CurrencyType[x.currency]} (${x.value} тг.)`,
          item: x.currency,
        };
      });

    this.selectedCurrency = this.currenciesAsItems[0].item;
    this.currencyDate = this.currencies[0].pubDate;
  }

  onSelectionChange(e: SelectItem<CurrencyType>): void {

    if (e == null) {
      // clear selection
      return;
    }

    const selectedCurrencyData = this.currencies!.find(x => x.currency === e.item);
    console.log("Currency selected: ", selectedCurrencyData);
    this.chart?.setCurrentCurrency(e.item);
  }
}
