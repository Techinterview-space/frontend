import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserSalaryAdminDto } from "@models/salaries/salary.model";
import { SalariesSkillsChartDataObject } from "./salaries-skills-chart-data-object";
import { SalariesSkillsChartData } from "@services/user-salaries.service";
import { LabelEntityDto } from "@services/label-entity.model";

class TableRow {
  readonly title: string;
  readonly part: number;

  constructor(
    private readonly skill: LabelEntityDto,
    readonly value: number,
    private readonly totalCount: number,
  ) {
    this.title = skill.title;
    this.part = (value / totalCount) * 100;
  }
}

@Component({
  selector: "app-salaries-skills-chart",
  templateUrl: "./salaries-skills-chart.component.html",
  styleUrl: "./salaries-skills-chart.component.scss",
  standalone: false,
})
export class SalariesSkillsChartComponent implements OnInit {
  @Input()
  chartData: SalariesSkillsChartData | null = null;

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: SalariesSkillsChartDataObject | null = null;
  showNoDataArea = false;
  tableRows: Array<TableRow> | null = null;
  totalCount = 0;

  readonly canvasId = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngOnInit(): void {
    if (this.chartData == null || this.chartData.items.length === 0) {
      return;
    }

    const totalDataCount = this.chartData.items.reduce(
      (sum, item) => sum + item.count,
      0,
    );
    this.totalCount = totalDataCount;

    this.tableRows = this.chartData.items
      .map((item) => {
        return new TableRow(item.skill, item.count, totalDataCount);
      })
      .sort((a, b) => b.part - a.part);
  }

  ngAfterViewInit() {
    this.initChart();
  }

  openEditSalaryAction(): void {
    this.editSalaryActionClick.emit();
  }

  changeShowNoDataAreaToggler(): void {
    this.chartDataLocal?.toggleNoDataArea(this.showNoDataArea);
  }

  private initChart(): void {
    if (this.chartData == null || this.chartData.items.length === 0) {
      return;
    }

    this.chartDataLocal = new SalariesSkillsChartDataObject(
      this.canvasId,
      this.chartData,
    );

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
