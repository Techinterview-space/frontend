import { Component, Input, OnInit } from "@angular/core";
import { DeveloperGrade } from "@models/enums";
import { SalariesByGrade } from "@services/user-salaries.service";
import { SalariesChart } from "../salaries-chart";
import { formatNumber } from "@angular/common";

interface Item extends SalariesByGrade {
  gradeAsString: string;
  medianSalaryAsString: string;
  averageSalaryAsString: string;
}

@Component({
  selector: "app-salaries-by-grade-block",
  templateUrl: "./salaries-by-grade-block.component.html",
  styleUrl: "./salaries-by-grade-block.component.scss",
})
export class SalariesByGradeBlockComponent implements OnInit {
  items: Array<Item> | null = null;

  @Input()
  source: Array<SalariesByGrade> | null = null;

  totalCount: number = 0;

  ngOnInit(): void {
    if (this.source == null) {
      this.items = [];
      return;
    }

    this.items = this.source.map((x) => {
      this.totalCount += x.count;
      return {
        gradeAsString: DeveloperGrade[x.grade],
        grade: x.grade,
        count: x.count,
        hasData: x.hasData,
        averageSalary: x.averageSalary,
        medianSalary: x.medianSalary,
        medianSalaryAsString: x.medianSalary != null ? formatNumber(x.medianSalary, "en-US", "1.0-2") : "",
        averageSalaryAsString: x.averageSalary != null ? formatNumber(x.averageSalary, "en-US", "1.0-2") : "",
      };
    });
  }
}
