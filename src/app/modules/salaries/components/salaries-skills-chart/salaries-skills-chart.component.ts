import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserSalary, UserSalaryAdminDto } from "@models/salaries/salary.model";
import { SalariesSkillsChartJsObject } from "./salaries-skills-chart-js-object";
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
    selector: "app-salaries-skills-chart",
    templateUrl: "./salaries-skills-chart.component.html",
    styleUrl: "./salaries-skills-chart.component.scss",
    standalone: false
})
export class SalariesSkillsChartComponent implements OnInit {
  @Input()
  skills: Array<LabelEntityDto> = [];

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Input()
  salaries: Array<UserSalary> | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: SalariesSkillsChartJsObject | null = null;
  showNoDataArea = false;
  tableRows: Array<TableRow> | null = null;
  totalCount = 0;

  readonly canvasId = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngOnInit(): void {
    if (
      this.salaries == null ||
      this.salaries.length === 0 ||
      this.skills.length === 0
    ) {
      return;
    }

    const uniqueSkills = SalariesSkillsChartJsObject.prepareUniqueSkills(
      this.salaries,
      this.skills
    );
    const salariesWithSkill = this.salaries.filter((x) => x.skillId != null);
    this.tableRows = uniqueSkills
      .map((skill) => {
        const value = salariesWithSkill.filter(
          (x) => x.skillId === skill.id
        ).length;

        this.totalCount += value;
        return new TableRow(skill, value, salariesWithSkill.length ?? 0);
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
      this.skills.length === 0
    ) {
      return;
    }

    this.chartDataLocal = new SalariesSkillsChartJsObject(
      this.canvasId,
      this.salaries,
      this.skills
    );

    var chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      chartEl.style.height = chartEl?.parentElement.style.height ?? "100%";
    }
  }
}
