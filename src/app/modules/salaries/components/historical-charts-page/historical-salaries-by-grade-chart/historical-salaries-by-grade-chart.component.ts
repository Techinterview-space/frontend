import { Component, Input, OnInit } from "@angular/core";
import { SalariesCountWeekByWeekChart } from "@services/historical-charts.service";
import { HistoricalSalariesByGradeChartObject } from "./historical-salaries-by-grade-chart-object";
import { DeveloperGrade, DeveloperGradeEnum } from "@models/enums";

interface GradeToggleButton {
  label: string;
  bgCss: string;
  textCss: string;
  toggle(): void;
}

@Component({
  selector: "app-historical-salaries-by-grade-chart",
  templateUrl: "./historical-salaries-by-grade-chart.component.html",
  styleUrls: ["./historical-salaries-by-grade-chart.component.scss"],
  standalone: false,
})
export class HistoricalSalariesByGradeChartComponent implements OnInit {
  gradesButtons: Array<GradeToggleButton> = [];

  @Input()
  data: SalariesCountWeekByWeekChart | null = null;

  chart: HistoricalSalariesByGradeChartObject | null = null;

  ngOnInit(): void {
    if (this.data == null || !this.data.hasGradeItems) {
      return;
    }

    this.gradesButtons = [
      this.createGradeToggleButton(DeveloperGrade.Junior),
      this.createGradeToggleButton(DeveloperGrade.Middle),
      this.createGradeToggleButton(DeveloperGrade.Senior),
      this.createGradeToggleButton(DeveloperGrade.Lead),
    ];

    this.chart = new HistoricalSalariesByGradeChartObject(
      "canvas-historical-chart-by-grade",
      this.data,
    );
  }

  private createGradeToggleButton(grade: DeveloperGrade): GradeToggleButton {
    const color = DeveloperGradeEnum.getColorData(grade);
    return {
      label: color.label,
      bgCss: color.cssBackground,
      textCss: color.cssText,
      toggle: () => {
        this.chart?.toggle(grade);
      },
    };
  }
}
