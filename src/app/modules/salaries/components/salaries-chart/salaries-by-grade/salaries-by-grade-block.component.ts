import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DeveloperGrade } from "@models/enums";
import { SalariesByGrade } from "@services/user-salaries.service";
import { SalariesChart } from "../salaries-chart";
import { formatNumber } from "@angular/common";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CurrencyType } from "@services/admin-tools.service";
import { FormatAsMoneyPipe } from "@shared/directives/format-as-money.pipe";

interface Item extends SalariesByGrade {
  gradeAsString: string;
  medianSalaryAsString: string;
  averageSalaryAsString: string;
}

@Component({
  selector: "app-salaries-by-grade-block",
  templateUrl: "./salaries-by-grade-block.component.html",
  styleUrl: "./salaries-by-grade-block.component.scss",
  standalone: false,
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
    const source = this.showLocal
      ? this.chart!.localSalariesByGrade
      : this.chart!.remoteSalariesByGrade;
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
        medianSalaryAsString:
          x.medianSalary != null
            ? FormatAsMoneyPipe.formatNumber(x.medianSalary)
            : "",
        averageSalaryAsString:
          x.averageSalary != null
            ? FormatAsMoneyPipe.formatNumber(x.averageSalary)
            : "",
      };
    });
  }

  ngOnDestroy(): void {}
}
