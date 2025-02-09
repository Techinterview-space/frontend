import { Component, Input, OnInit } from "@angular/core";
import { SalariesCountWeekByWeekChart } from "@services/historical-charts.service";
import { HistoricalSalariesChartObject } from "./historical-salaries-chart-object";

@Component({
  selector: "app-historical-salaries-chart",
  templateUrl: "./historical-salaries-chart.component.html",
  styleUrls: ["./historical-salaries-chart.component.scss"],
  standalone: false,
})
export class HistoricalSalariesChartComponent implements OnInit {
  @Input()
  data: SalariesCountWeekByWeekChart | null = null;

  chart: HistoricalSalariesChartObject | null = null;

  ngOnInit(): void {
    if (this.data == null) {
      return;
    }

    this.chart = new HistoricalSalariesChartObject(
      "canvas-historical-chart",
      this.data,
    );
  }
}
