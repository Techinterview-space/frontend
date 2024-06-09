import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DeveloperGrade } from "@models/enums";
import { SalariesByGrade } from "@services/user-salaries.service";
import { SalariesChart } from "../salaries-chart";
import { formatNumber } from "@angular/common";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CurrencyType } from "@services/admin-tools.service";

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
export class SalariesByGradeBlockComponent implements OnInit, OnDestroy {
  items: Array<Item> | null = null;

  @Input()
  chart: SalariesChart | null = null;

  @Input()
  showLocal: boolean = true;

  totalCount: number = 0;

  currentCurrencyLabel: string | null = null;

  ngOnInit(): void {

    if (this.chart == null) {
      this.items = [];
      return;
    }

    this.recaulculate();
    this.chart.currentCurrencyChanged$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.items = null;
        this.totalCount = 0;
        this.currentCurrencyLabel = null;

        this.recaulculate();
      });
  }

  private recaulculate(): void {
    const source = this.showLocal ? this.chart!.localSalariesByGrade : this.chart!.remoteSalariesByGrade;
    if (source == null) {
      this.items = [];
      return;
    }

    this.currentCurrencyLabel = this.chart!.getCurrentCurrencyLabel();
    this.items = source.map((x) => {
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

  ngOnDestroy(): void {}
}
