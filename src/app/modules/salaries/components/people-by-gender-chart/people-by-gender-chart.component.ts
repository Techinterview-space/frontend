import { formatNumber } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Gender } from "@models/enums/gender.enum";
import { UserSalary, UserSalaryAdminDto } from "@models/salaries/salary.model";
import { CompanyType } from "@models/salaries/company-type";

interface ProgressBarData {
  color: string;
  textColor: string;
  value: string;
  width: number;
  maxValue: string;
  label: string;
}

@Component({
  selector: "app-people-by-gender-chart",
  templateUrl: "./people-by-gender-chart.component.html",
  styleUrl: "./people-by-gender-chart.component.scss",
})
export class PeopleByGenderChartComponent implements OnInit {
  static readonly defaultColor = {
    color: "bg-light",
    textColor: "text-dark",
    title: "нет данных",
  };

  readonly colorsByGrade: Map<
    Gender,
    { color: string; textColor: string; title: string }
  > = new Map([
    [
      Gender.Female,
      { color: "bg-primary", textColor: "text-white", title: "Женщины" },
    ],
    [
      Gender.Male,
      { color: "bg-success", textColor: "text-white", title: "Мужчины" },
    ],
    [
      Gender.PreferNotToSay,
      {
        color: "bg-info",
        textColor: "text-dark",
        title: "Предпочли не указывать",
      },
    ],
    [
      Gender.Other,
      { color: "bg-warning", textColor: "text-dark", title: "Другое" },
    ],
    [Gender.Undefined, PeopleByGenderChartComponent.defaultColor],
  ]);

  colorByGradeLegend: Array<{
    gender: Gender;
    color: string;
    textColor: string;
    title: string;
  }> = [];

  @Input()
  salaries: Array<UserSalary> = [];

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  barsForLocal: Array<ProgressBarData> = [];
  barsForRemote: Array<ProgressBarData> = [];

  totalCountLocal: number = 0;
  totalCountRemote: number = 0;

  showPercents = true;

  @Input()
  title: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.initCharts();
    this.colorsByGrade.forEach((value, key) => {
      this.colorByGradeLegend.push({
        gender: key,
        color: value.color,
        textColor: value.textColor,
        title: value.title,
      });
    });
  }

  toggleCountAndPercent(): void {
    this.showPercents = !this.showPercents;
    this.initCharts();
  }

  private initCharts(): void {
    if (this.salaries.length === 0) {
      return;
    }

    const localSararies = this.salaries.filter(
      (item) => item.company === CompanyType.Local
    );
    const remoteSararies = this.salaries.filter(
      (item) => item.company === CompanyType.Remote
    );

    if (localSararies.length > 0) {
      this.totalCountLocal = localSararies.length;
      this.barsForLocal = this.prepareData(localSararies, this.showPercents);
    }

    if (remoteSararies.length > 0) {
      this.totalCountRemote = remoteSararies.length;
      this.barsForRemote = this.prepareData(remoteSararies, this.showPercents);
    }
  }

  openEditSalaryAction(): void {
    this.editSalaryActionClick.emit();
  }

  private prepareData(
    salaries: Array<UserSalary>,
    showPercents: boolean
  ): Array<ProgressBarData> {
    const totalCount = salaries.length;

    const salariesGroupedByGender: Array<{
      gender: Gender | null;
      salaries: Array<UserSalary>;
    }> = [];
    salaries.forEach((item) => {
      const existingGroup = salariesGroupedByGender.find(
        (x) => x.gender == item.gender
      );
      if (existingGroup != null) {
        existingGroup.salaries.push(item);
      } else {
        salariesGroupedByGender.push({ gender: item.gender, salaries: [item] });
      }
    });

    const result = salariesGroupedByGender
      .filter((item) => item.gender != null)
      .map((item, index) => {
        const color =
          this.colorsByGrade.get(item.gender!) ??
          PeopleByGenderChartComponent.defaultColor;
        const width = (item.salaries.length / totalCount) * 100;
        const value = showPercents
          ? formatNumber(width, "en-US", "1.0-2") + "%"
          : formatNumber(item.salaries.length, "en-US", "1.0-0");

        const maxValue = showPercents
          ? "100"
          : formatNumber(totalCount, "en-US", "1.0-0");

        return {
          color: color.color,
          textColor: color.textColor,
          value: value,
          maxValue: maxValue,
          width: width,
          label: Gender[item.gender!],
        };
      });

    const noGradeData = salariesGroupedByGender.find(
      (item) => item.gender === Gender.Undefined || item.gender == null
    );
    if (noGradeData != null) {
      const color =
        this.colorsByGrade.get(Gender.Undefined) ??
        PeopleByGenderChartComponent.defaultColor;
      const width = (noGradeData.salaries.length / totalCount) * 100;
      const value = showPercents
        ? formatNumber(width, "en-US", "1.0-2") + "%"
        : formatNumber(noGradeData.salaries.length, "en-US", "1.0-0");

      const maxValue = showPercents
        ? "100"
        : formatNumber(totalCount, "en-US", "1.0-0");

      result.push({
        color: color.color,
        textColor: color.textColor,
        value: value,
        maxValue: maxValue,
        width: width,
        label: "Пол не указан",
      });
    }

    return result;
  }
}
