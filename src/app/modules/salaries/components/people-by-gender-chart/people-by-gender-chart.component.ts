import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Gender, GenderEnum } from "@models/enums/gender.enum";
import { UserSalaryAdminDto } from "@models/salaries/salary.model";
import { SalariesByGenderChart } from "@services/user-salaries.service";
import { SalariesChart } from "../salaries-chart/salaries-chart";

interface TableRow {
  value: number;
  part: number;
  totalCount: number;
  label: string;
}

@Component({
  selector: "app-people-by-gender-chart",
  templateUrl: "./people-by-gender-chart.component.html",
  styleUrl: "./people-by-gender-chart.component.scss",
  standalone: false,
})
export class PeopleByGenderChartComponent implements OnInit {
  @Input()
  chartData: SalariesChart | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  currentSalary: UserSalaryAdminDto | null = null;
  barsForLocal: Array<TableRow> = [];
  barsForRemote: Array<TableRow> = [];

  totalCountLocal: number = 0;
  totalCountRemote: number = 0;

  showPercents = true;

  salariesByGenderChartForLocal: SalariesByGenderChart | null = null;
  salariesByGenderChartForRemote: SalariesByGenderChart | null = null;

  @Input()
  title: string | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.chartData == null) {
      return;
    }

    this.currentSalary = this.chartData.currentUserSalary;
    
    const peopleByGenderData = this.chartData.peopleByGenderChartData;
    if (peopleByGenderData != null) {
      if (peopleByGenderData.localData.totalCount > 0) {
        this.totalCountLocal = peopleByGenderData.localData.totalCount;
        this.barsForLocal = this.prepareDataFromChartData(peopleByGenderData.localData.items, peopleByGenderData.localData.noGenderCount, peopleByGenderData.localData.noGenderPercentage);
        this.salariesByGenderChartForLocal =
          this.chartData.salariesByGenderChartForLocal;
      }

      if (peopleByGenderData.remoteData.totalCount > 0) {
        this.totalCountRemote = peopleByGenderData.remoteData.totalCount;
        this.barsForRemote = this.prepareDataFromChartData(peopleByGenderData.remoteData.items, peopleByGenderData.remoteData.noGenderCount, peopleByGenderData.remoteData.noGenderPercentage);
        this.salariesByGenderChartForRemote =
          this.chartData.salariesByGenderChartForRemote;
      }
    }
  }

  openEditSalaryAction(): void {
    this.editSalaryActionClick.emit();
  }

  private prepareDataFromChartData(
    genderItems: Array<{ gender: Gender; count: number; percentage: number }>,
    noGenderCount: number,
    noGenderPercentage: number
  ): Array<TableRow> {
    const result: Array<TableRow> = [];
    
    // Add items with known gender
    genderItems
      .filter((item) => item.gender != null && item.gender !== Gender.Undefined)
      .sort((x, y) => x.gender - y.gender)
      .forEach((item) => {
        result.push({
          value: item.count,
          part: item.percentage,
          totalCount: item.count, // This will be updated by parent component
          label: GenderEnum.label(item.gender),
        });
      });

    // Add "no gender" data if exists
    if (noGenderCount > 0) {
      result.push({
        value: noGenderCount,
        part: noGenderPercentage,
        totalCount: noGenderCount, // This will be updated by parent component
        label: "Пол не указан",
      });
    }

    return result;
  }

  private prepareData_Legacy(salaries: Array<any>): Array<TableRow> {
    // This method is kept for reference but should not be used anymore
    // All data processing should be done on the backend
    return [];
  }
}
