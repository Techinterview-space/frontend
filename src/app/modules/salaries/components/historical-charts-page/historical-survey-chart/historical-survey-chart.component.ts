import { Component, Input, OnInit } from "@angular/core";
import { ExpectationChartObject } from "./expectation-chart-object";
import { HistoricalSurveyChartResponse } from "@services/historical-charts.models";
import { UsefulnessGradeChartObject } from "./usefulness-grade-chart-object";
import { ExpectationGradeChartObject } from "./expectation-grade-chart-object";
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

  expectationChart: ExpectationChartObject | null = null;

  usefulnessGradeLocalChart: UsefulnessGradeChartObject | null = null;
  usefulnessRemoteChart: UsefulnessGradeChartObject | null = null;

  expectationGradeLocalChart: ExpectationGradeChartObject | null = null;
  expectationGradeRemoteChart: ExpectationGradeChartObject | null = null;

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

    this.expectationChart = new ExpectationChartObject(
      "expectation-chart",
      this.data
    );

    this.usefulnessGradeLocalChart = new UsefulnessGradeChartObject(
      "usefulness-grade-local-chart",
      this.data,
      (x) => x.localUsefulnessPercentage,
      (x) => x.localCount
    );

    this.usefulnessRemoteChart = new UsefulnessGradeChartObject(
      "usefulness-grade-remote-chart",
      this.data,
      (x) => x.remoteUsefulnessPercentage,
      (x) => x.remoteCount
    );

    this.expectationGradeLocalChart = new ExpectationGradeChartObject(
      "expectation-grade-local-chart",
      this.data,
      (x) => x.localExpectationPercentage,
      (x) => x.localCount
    );

    this.expectationGradeRemoteChart = new ExpectationGradeChartObject(
      "expectation-grade-remote-chart",
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
        this.usefulnessGradeLocalChart?.toggle(grade);
        this.usefulnessRemoteChart?.toggle(grade);
        this.expectationGradeLocalChart?.toggle(grade);
        this.expectationGradeRemoteChart?.toggle(grade);
      },
    };
  }
}
