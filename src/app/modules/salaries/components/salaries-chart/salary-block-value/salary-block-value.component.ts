import { Component, Input } from "@angular/core";
import { SalariesChart } from "../salaries-chart";

@Component({
  selector: "app-salary-block-value",
  templateUrl: "./salary-block-value.component.html",
  styleUrl: "./salary-block-value.component.scss",
})
export class SalaryBlockValueComponent {
  @Input()
  source: SalariesChart | null = null;

  get median(): string {
    return this.source?.medianSalary ?? "";
  }

  get average(): string {
    return this.source?.averageSalary ?? "";
  }

  get medianRemote(): string {
    return this.source?.medianRemoteSalary ?? "";
  }

  get averageRemote(): string {
    return this.source?.averageRemoteSalary ?? "";
  }
}
