import { Component, Input } from "@angular/core";
import { SalariesChart } from "../salaries-chart";
import { formatNumber } from "@angular/common";

@Component({
  selector: "app-salary-block-value",
  templateUrl: "./salary-block-value.component.html",
  styleUrl: "./salary-block-value.component.scss",
})
export class SalaryBlockValueComponent {
  @Input()
  source: SalariesChart | null = null;

  get median(): string {
    return SalaryBlockValueComponent.formatNumber(this.source?.medianSalary);
  }

  get average(): string {
    return SalaryBlockValueComponent.formatNumber(this.source?.averageSalary);
  }

  get medianRemote(): string {
    return SalaryBlockValueComponent.formatNumber(this.source?.medianRemoteSalary);
  }

  get averageRemote(): string {
    return SalaryBlockValueComponent.formatNumber(this.source?.averageRemoteSalary);
  }

  private static formatNumber(value: number | null | undefined): string {

    if (value == null) {
      return "";
    }

    return formatNumber(value, "en-US", "1.0-2");
  }
}
