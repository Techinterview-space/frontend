import { formatNumber } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { DeveloperGrade, DeveloperGradeEnum } from "@models/enums";
import { PeopleByGradesChartData } from "@services/user-salaries.service";
import { SalariesChart } from "../salaries-chart/salaries-chart";

interface ProgressBarData {
  color: string;
  textColor: string;
  value: string;
  width: number;
  maxValue: string;
  label: string;
  showLabel: boolean;
}

// Narrower than this and the in-bar percentage clips, so it moves to the tooltip.
const MIN_LABEL_WIDTH_PERCENT = 7;

@Component({
  selector: "app-people-by-grades-chart",
  templateUrl: "./people-by-grades-chart.component.html",
  styleUrl: "./people-by-grades-chart.component.scss",
  standalone: false,
})
export class PeopleByGradesChartComponent implements OnInit {
  readonly grades = DeveloperGradeEnum.grades;

  @Input()
  source: SalariesChart | null = null;

  barsForLocal: Array<ProgressBarData> = [];
  barsForRemote: Array<ProgressBarData> = [];

  legendItems: Array<{ label: string; bg: string; on: string }> = [];

  totalCountLocal: number = 0;
  totalCountRemote: number = 0;

  showPercents = true;

  constructor() {}

  ngOnInit(): void {
    this.initCharts();
    this.legendItems = this.grades.map((grade) => {
      const ramp = this.gradeRampColors(grade);
      return {
        label: DeveloperGradeEnum.getColorData(grade).label,
        bg: ramp.bg,
        on: ramp.on,
      };
    });
  }

  toggleCountAndPercent(): void {
    this.showPercents = !this.showPercents;
    this.initCharts();
  }

  private initCharts(): void {
    if (this.source == null) {
      return;
    }

    if (this.source.peopleByGradesChartDataForLocal != null) {
      this.totalCountLocal =
        this.source.peopleByGradesChartDataForLocal.allCount;
      this.barsForLocal = this.prepareData(
        this.source.peopleByGradesChartDataForLocal,
        this.showPercents,
      );
    }

    if (this.source.peopleByGradesChartDataForRemote != null) {
      this.totalCountRemote =
        this.source.peopleByGradesChartDataForRemote.allCount;
      this.barsForRemote = this.prepareData(
        this.source.peopleByGradesChartDataForRemote,
        this.showPercents,
      );
    }
  }

  private prepareData(
    data: PeopleByGradesChartData,
    showPercents: boolean,
  ): Array<ProgressBarData> {
    const totalCount = data.allCount;

    const result = data.data
      .filter(
        (item) => item.grade != null && item.grade !== DeveloperGrade.Unknown,
      )
      .sort((a, b) => a.grade - b.grade)
      .map((item, _index) => {
        const ramp = this.gradeRampColors(item.grade);
        const width = (item.count / totalCount) * 100;
        const value = showPercents
          ? formatNumber(width, "en-US", "1.0-2") + "%"
          : formatNumber(item.count, "en-US", "1.0-0");

        const maxValue = showPercents
          ? "100"
          : formatNumber(totalCount, "en-US", "1.0-0");

        return {
          color: ramp.bg,
          textColor: ramp.on,
          value: value,
          maxValue: maxValue,
          width: width,
          label: DeveloperGrade[item.grade],
          showLabel: width >= MIN_LABEL_WIDTH_PERCENT,
        };
      });

    const noGradeData = data.data.find(
      (item) => item.grade === DeveloperGrade.Unknown,
    );

    if (noGradeData != null) {
      const ramp = this.gradeRampColors(DeveloperGrade.Unknown);
      const width = (noGradeData.count / totalCount) * 100;
      const value = showPercents
        ? formatNumber(width, "en-US", "1.0-2") + "%"
        : formatNumber(noGradeData.count, "en-US", "1.0-0");

      const maxValue = showPercents
        ? "100"
        : formatNumber(totalCount, "en-US", "1.0-0");

      result.push({
        color: ramp.bg,
        textColor: ramp.on,
        value: value,
        maxValue: maxValue,
        width: width,
        label: "Грейд не указан",
        showLabel: width >= MIN_LABEL_WIDTH_PERCENT,
      });
    }

    return result;
  }

  // Grades are an ordered scale, so they map onto the sequential warm ramp
  // (--warm-grade-*) rather than the categorical grade-badge colors used
  // elsewhere. CSS variables keep the bars light/dark-mode aware.
  private gradeRampColors(grade: DeveloperGrade): { bg: string; on: string } {
    const band = this.gradeBand(grade);
    return {
      bg: `var(--warm-grade-${band})`,
      on: `var(--warm-grade-${band}-on)`,
    };
  }

  private gradeBand(
    grade: DeveloperGrade,
  ): "trainee" | "junior" | "middle" | "senior" | "lead" | "unknown" {
    if (grade === DeveloperGrade.Unknown) return "unknown";
    if (grade === DeveloperGrade.Trainee) return "trainee";
    if (grade <= DeveloperGrade.JuniorStrong) return "junior";
    if (grade <= DeveloperGrade.MiddleStrong) return "middle";
    if (grade <= DeveloperGrade.SeniorStrong) return "senior";
    return "lead";
  }
}
