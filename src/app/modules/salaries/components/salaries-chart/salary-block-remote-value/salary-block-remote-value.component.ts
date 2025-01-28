import { Component, Input } from "@angular/core";
import { SalariesChart } from "../salaries-chart";
import { formatNumber } from "@angular/common";
import { FormatAsMoneyPipe } from "@shared/directives/format-as-money.pipe";

@Component({
  selector: "app-salary-block-remote-value",
  templateUrl: "./salary-block-remote-value.component.html",
  styleUrl: "./salary-block-remote-value.component.scss",
})
export class SalaryBlockRemoteValueComponent {
  @Input()
  source: SalariesChart | null = null;

  get median(): string {
    return FormatAsMoneyPipe.formatNumber(this.source?.medianRemoteSalary);
  }

  get average(): string {
    return FormatAsMoneyPipe.formatNumber(this.source?.averageRemoteSalary);
  }
}
