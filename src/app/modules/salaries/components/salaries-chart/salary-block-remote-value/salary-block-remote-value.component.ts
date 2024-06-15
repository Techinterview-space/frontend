import { Component, Input } from "@angular/core";
import { SalariesChart } from "../salaries-chart";
import { formatNumber } from "@angular/common";

@Component({
  selector: "app-salary-block-remote-value",
  templateUrl: "./salary-block-remote-value.component.html",
  styleUrl: "./salary-block-remote-value.component.scss",
})
export class SalaryBlockRemoteValueComponent {
  @Input()
  source: SalariesChart | null = null;

  get median(): string {
    return SalaryBlockRemoteValueComponent.formatNumber(
      this.source?.medianRemoteSalary
    );
  }

  get average(): string {
    return SalaryBlockRemoteValueComponent.formatNumber(
      this.source?.averageRemoteSalary
    );
  }

  private static formatNumber(value: number | null | undefined): string {
    if (value == null) {
      return "";
    }

    return formatNumber(value, "en-US", "1.0-2");
  }
}
