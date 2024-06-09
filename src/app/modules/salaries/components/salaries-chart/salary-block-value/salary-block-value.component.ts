import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { SalariesChart } from "../salaries-chart";
import { formatNumber } from "@angular/common";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  selector: "app-salary-block-value",
  templateUrl: "./salary-block-value.component.html",
  styleUrl: "./salary-block-value.component.scss",
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

    this.median = SalaryBlockValueComponent.formatNumber(this.source.medianSalary);
    this.average = SalaryBlockValueComponent.formatNumber(this.source.averageSalary);
    this.medianRemote = SalaryBlockValueComponent.formatNumber(this.source.medianRemoteSalary);
    this.averageRemote = SalaryBlockValueComponent.formatNumber(this.source.averageRemoteSalary);
    this.currentCurrencyLabel = this.source.getCurrentCurrencyLabel();
  }

  private static formatNumber(value: number | null | undefined): string {

    if (value == null) {
      return "";
    }

    return formatNumber(value, "en-US", "1.0-2");
  }
}
