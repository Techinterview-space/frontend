import { Component, Input, OnInit } from "@angular/core";
import { DeveloperGrade } from "@models/enums";
import { SalariesByGrade } from "@services/user-salaries.service";
import { SalariesChart } from "../salaries-chart";

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
        medianSalaryAsString: SalariesChart.formatNumber(x.medianSalary) ?? "",
        averageSalaryAsString:
          SalariesChart.formatNumber(x.averageSalary) ?? "",
      };
    });
  }
}
