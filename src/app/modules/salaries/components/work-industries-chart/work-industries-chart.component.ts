import { Component, EventEmitter, Input, Output, OnInit, AfterViewInit } from "@angular/core";
import { UserSalaryAdminDto } from "@models/salaries/salary.model";
import { WorkIndustriesChartDataObject } from "./work-industries-chart-data-object";
import { WorkIndustriesChartData } from "@services/user-salaries.service";
import { LabelEntityDto } from "@services/label-entity.model";

class TableRow {
  readonly title: string;
  readonly part: number;

  constructor(
    private readonly industry: LabelEntityDto,
    readonly value: number,
    private readonly totalCount: number,
  ) {
    this.title = industry.title;
    this.part = (value / totalCount) * 100;
  }
}

@Component({
  selector: "app-work-industries-chart",
  templateUrl: "./work-industries-chart.component.html",
  styleUrl: "./work-industries-chart.component.scss",
  standalone: false,
})
export class WorkIndustriesChartComponent implements OnInit, AfterViewInit {
  @Input()
  chartData: WorkIndustriesChartData | null = null;

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: WorkIndustriesChartDataObject | null = null;
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
        return new TableRow(item.industry, item.count, totalDataCount);
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

    this.chartDataLocal = new WorkIndustriesChartDataObject(
      this.canvasId,
      this.chartData,
    );

    const chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
