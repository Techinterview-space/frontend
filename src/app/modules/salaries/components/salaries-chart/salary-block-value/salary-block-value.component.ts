import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { SalariesChart } from "../salaries-chart";
import { formatNumber } from "@angular/common";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { FormatAsMoneyPipe } from "@shared/directives/format-as-money.pipe";

@Component({
  selector: "app-salary-block-value",
  templateUrl: "./salary-block-value.component.html",
  styleUrl: "./salary-block-value.component.scss",
  standalone: false,
})
export class SalaryBlockValueComponent implements OnInit, OnDestroy {
  @Input()
  source: SalariesChart | null = null;

  median: string | null = null;
  average: string | null = null;
  medianRemote: string | null = null;
  averageRemote: string | null = null;
  currentCurrencyLabel: string = "";

  ngOnInit(): void {
    this.recalculcate();

    if (this.source != null) {
      this.source.currentCurrencyChanged$
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.recalculcate();
        });
    }
  }

  ngOnDestroy(): void {}

  private recalculcate(): void {
    if (this.source == null) {
      return;
    }

    this.median = FormatAsMoneyPipe.formatNumber(this.source.medianSalary);
    this.average = FormatAsMoneyPipe.formatNumber(this.source.averageSalary);
    this.medianRemote = FormatAsMoneyPipe.formatNumber(
      this.source.medianRemoteSalary,
    );
    this.averageRemote = FormatAsMoneyPipe.formatNumber(
      this.source.averageRemoteSalary,
    );
    this.currentCurrencyLabel = this.source.getCurrentCurrencyLabel();
  }
}
