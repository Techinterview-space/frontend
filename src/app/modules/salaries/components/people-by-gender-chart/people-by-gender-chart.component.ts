import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Gender, GenderEnum } from "@models/enums/gender.enum";
import { UserSalary, UserSalaryAdminDto } from "@models/salaries/salary.model";
import { CompanyType } from "@models/salaries/company-type";

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
})
export class PeopleByGenderChartComponent implements OnInit {
  @Input()
  salaries: Array<UserSalary> = [];

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  barsForLocal: Array<TableRow> = [];
  barsForRemote: Array<TableRow> = [];

  totalCountLocal: number = 0;
  totalCountRemote: number = 0;

  showPercents = true;

  @Input()
  title: string | null = null;

  constructor() {}

  ngOnInit(): void {
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
      this.barsForLocal = this.prepareData(localSararies);
    }

    if (remoteSararies.length > 0) {
      this.totalCountRemote = remoteSararies.length;
      this.barsForRemote = this.prepareData(remoteSararies);
    }
  }

  openEditSalaryAction(): void {
    this.editSalaryActionClick.emit();
  }

  private prepareData(salaries: Array<UserSalary>): Array<TableRow> {
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

    const result: Array<TableRow> = [];
    salariesGroupedByGender
      .filter((item) => item.gender != null)
      .sort((x, y) => x.gender! - y.gender!)
      .forEach((item) => {
        result.push({
          value: item.salaries.length,
          part: (item.salaries.length / salaries.length) * 100,
          totalCount: salaries.length,
          label: GenderEnum.label(item.gender!),
        });
      });

    const noGradeData = salariesGroupedByGender.find(
      (item) => item.gender === Gender.Undefined || item.gender == null
    );

    if (noGradeData != null) {
      result.push({
        value: noGradeData.salaries.length,
        part: (noGradeData.salaries.length / salaries.length) * 100,
        totalCount: salaries.length,
        label: "Пол не указан",
      });
    }

    return result;
  }
}
