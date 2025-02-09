import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserSalary, UserSalaryAdminDto } from "@models/salaries/salary.model";
import { WorkIndustriesChartJsObject } from "./work-industries-chart-js-object";
import { LabelEntityDto } from "@services/label-entity.model";

class TableRow {
  readonly title: string;
  readonly part: number;

  constructor(
    private readonly skill: LabelEntityDto,
    readonly value: number,
    private readonly totalCount: number
  ) {
    this.title = skill.title;
    this.part = (value / totalCount) * 100;
  }
}

@Component({
    selector: "app-work-industries-chart",
    templateUrl: "./work-industries-chart.component.html",
    styleUrl: "./work-industries-chart.component.scss",
    standalone: false
})
export class WorkIndustriesChartComponent {
  @Input()
  industries: Array<LabelEntityDto> = [];

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Input()
  salaries: Array<UserSalary> | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: WorkIndustriesChartJsObject | null = null;
  showNoDataArea = false;
  tableRows: Array<TableRow> | null = null;
  totalCount = 0;

  readonly canvasId = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngOnInit(): void {
    if (
      this.salaries == null ||
      this.salaries.length === 0 ||
      this.industries.length === 0
    ) {
      return;
    }

    const uniqueItems = WorkIndustriesChartJsObject.prepareUniqueIndustries(
      this.salaries,
      this.industries
    );

    const salariesWithIndustry = this.salaries.filter((x) => x.skillId != null);
    this.tableRows = uniqueItems
      .map((x) => {
        const value = salariesWithIndustry.filter(
          (s) => s.workIndustryId === x.id
        ).length;

        this.totalCount += value;
        return new TableRow(x, value, salariesWithIndustry.length ?? 0);
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
    if (
      this.salaries == null ||
      this.salaries.length === 0 ||
      this.industries.length === 0
    ) {
      return;
    }

    this.chartDataLocal = new WorkIndustriesChartJsObject(
      this.canvasId,
      this.salaries,
      this.industries
    );

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
