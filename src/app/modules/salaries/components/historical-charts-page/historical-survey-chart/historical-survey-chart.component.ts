import { Component, Input, OnInit } from "@angular/core";
import { SalariesCountWeekByWeekChart } from "@services/historical-charts.service";
import { HistoricalSurveyChartObject } from "./historical-survey-chart-object";
import { HistoricalSurveyChartResponse } from "@services/historical-charts.models";
@Component({
  selector: "app-historical-survey-chart",
  templateUrl: "./historical-survey-chart.component.html",
  styleUrls: ["./historical-survey-chart.component.scss"],
})
export class HistoricalSurveyChartComponent implements OnInit {
  @Input()
  data: HistoricalSurveyChartResponse | null = null;

  surveyChart: HistoricalSurveyChartObject | null = null;

  ngOnInit(): void {
    if (this.data == null) {
      return;
    }

    this.surveyChart = new HistoricalSurveyChartObject(
      "historical-survey-chart",
      this.data
    );
  }
}
