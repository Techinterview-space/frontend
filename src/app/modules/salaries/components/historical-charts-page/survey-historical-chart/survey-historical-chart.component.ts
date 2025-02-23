import { Component, Input, OnInit } from "@angular/core";
import { SurveyHistoricalChartObject } from "./survey-historical-chart-object";
import { HistoricalSurveyChartResponse } from "@services/historical-charts.models";

@Component({
  selector: "app-survey-historical-chart",
  templateUrl: "./survey-historical-chart.component.html",
  styleUrls: ["./survey-historical-chart.component.scss"],
  standalone: false,
})
export class SurveyHistoricalChartComponent implements OnInit {
  @Input()
  data: HistoricalSurveyChartResponse | null = null;

  chart: SurveyHistoricalChartObject | null = null;
  readonly canvasId = "canvas_" + Math.random().toString(36);

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnInit(): void {}

  initChart(): void {
    if (this.data == null) {
      return;
    }

    this.chart = new SurveyHistoricalChartObject(this.canvasId, this.data);

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
