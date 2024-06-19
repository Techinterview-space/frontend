import { Component, Input, OnInit } from "@angular/core";
import { SalariesCountWeekByWeekChart } from "@services/historical-charts.service";
import { HistoricalSurveyChartObject } from "./historical-survey-chart-object";
import { HistoricalSurveyChartResponse } from "@services/historical-charts.models";
import { HistoricalSurveyGradeChartObject } from "./historical-survey-grade-chart-object";
import { HistoricalSurveyExpectationGradeChartObject } from "./historical-survey-expectation-grade-chart-object";
import { DeveloperGrade, DeveloperGradeEnum } from "@models/enums";

interface GradeToggleButton {
  label: string;
  bgCss: string;
  textCss: string;
  toggle(): void;
}

@Component({
  selector: "app-historical-survey-chart",
  templateUrl: "./historical-survey-chart.component.html",
  styleUrls: ["./historical-survey-chart.component.scss"],
})
export class HistoricalSurveyChartComponent implements OnInit {
  @Input()
  data: HistoricalSurveyChartResponse | null = null;

  gradesButtons: Array<GradeToggleButton> = [];

  surveyChart: HistoricalSurveyChartObject | null = null;

  surveyGradeLocalChart: HistoricalSurveyGradeChartObject | null = null;
  surveyGradeRemoteChart: HistoricalSurveyGradeChartObject | null = null;

  surveyExpectationGradeLocalChart: HistoricalSurveyExpectationGradeChartObject | null = null;
  surveyExpectationGradeRemoteChart: HistoricalSurveyExpectationGradeChartObject | null = null;

  ngOnInit(): void {
    if (this.data == null) {
      return;
    }

    this.gradesButtons = [
      this.createGradeToggleButton(DeveloperGrade.Junior),
      this.createGradeToggleButton(DeveloperGrade.Middle),
      this.createGradeToggleButton(DeveloperGrade.Senior),
      this.createGradeToggleButton(DeveloperGrade.Lead),
    ];

    this.surveyChart = new HistoricalSurveyChartObject(
      "historical-survey-chart",
      this.data
    );

    this.surveyGradeLocalChart = new HistoricalSurveyGradeChartObject(
      "historical-survey-grade-local-chart",
      this.data,
      (x) => x.localUsefulnessPercentage,
      (x) => x.localCount
    );

    this.surveyGradeRemoteChart = new HistoricalSurveyGradeChartObject(
      "historical-survey-grade-remote-chart",
      this.data,
      (x) => x.remoteUsefulnessPercentage,
      (x) => x.remoteCount
    );

    this.surveyExpectationGradeLocalChart = new HistoricalSurveyExpectationGradeChartObject(
      "historical-survey-expectation-grade-local-chart",
      this.data,
      (x) => x.localExpectationPercentage,
      (x) => x.localCount
    );

    this.surveyExpectationGradeRemoteChart = new HistoricalSurveyExpectationGradeChartObject(
      "historical-survey-expectation-grade-remote-chart",
      this.data,
      (x) => x.remoteExpectationPercentage,
      (x) => x.remoteCount
    );
  }

  private createGradeToggleButton(grade: DeveloperGrade): GradeToggleButton {
    const color = DeveloperGradeEnum.getColorData(grade);
    return {
      label: color.label,
      bgCss: color.cssBackground,
      textCss: color.cssText,
      toggle: () => {
        this.surveyGradeLocalChart?.toggle(grade);
        this.surveyGradeRemoteChart?.toggle(grade);
        this.surveyExpectationGradeLocalChart?.toggle(grade);
        this.surveyExpectationGradeRemoteChart?.toggle(grade);
      },
    };
  }
}
