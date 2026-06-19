import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import {
  CitiesDoughnutChartDataObject,
  CitiesChartItem,
} from "./cities-doughnut-chart-data-object";
import { UserSalaryAdminDto } from "@models/salaries/salary.model";
import { CitiesDoughnutChartData } from "@services/user-salaries.service";
import { KazakhstanCityEnum } from "@models/salaries/kazakhstan-city";

// Level 0 shows the most populated cities; each deeper level pages through the
// remaining tail. The aggregate bar only appears when it would collapse at
// least two cities, so a lone leftover keeps its own named bar.
const TOP_LEVEL_SIZE = 7;
const DRILL_LEVEL_SIZE = 6;
const MIN_AGGREGATE = 2;

class TableRow {
  readonly part: number;

  constructor(
    readonly title: string,
    readonly value: number,
    totalCount: number,
  ) {
    this.part = (value / totalCount) * 100;
  }
}

@Component({
  selector: "app-cities-doughnut-chart",
  templateUrl: "./cities-doughnut-chart.component.html",
  styleUrl: "./cities-doughnut-chart.component.scss",
  standalone: false,
})
export class CitiesDoughnutChartComponent implements OnInit, AfterViewInit {
  @Input()
  chartData: CitiesDoughnutChartData | null = null;

  @Input()
  currentSalary: UserSalaryAdminDto | null = null;

  @Output()
  editSalaryActionClick = new EventEmitter<void>();

  chartDataLocal: CitiesDoughnutChartDataObject | null = null;
  showNoDataArea = false;
  showTable = false;
  tableRows: Array<TableRow> | null = null;
  totalCount = 0;

  canGoBack = false;
  canDrill = false;
  aggregateLabel = "";
  rangeLabel = "";

  private level = 0;
  private sortedPool: Array<{ label: string; value: number }> = [];
  private poolTotal = 0;

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
      .map(
        (item) =>
          new TableRow(
            KazakhstanCityEnum.label(item.city),
            item.count,
            totalDataCount,
          ),
      )
      .sort((a, b) => b.part - a.part);
  }

  ngAfterViewInit() {
    this.initChart();
  }

  openEditSalaryAction(): void {
    this.editSalaryActionClick.emit();
  }

  changeShowNoDataAreaToggler(): void {
    if (this.chartDataLocal == null) {
      return;
    }

    this.rebuildPool();
    this.level = 0;
    this.renderLevel();
  }

  goBack(): void {
    if (this.level === 0) {
      return;
    }

    this.level -= 1;
    this.renderLevel();
  }

  private initChart(): void {
    if (this.chartData == null || this.chartData.items.length === 0) {
      return;
    }

    this.rebuildPool();
    const page = this.buildPage(this.level);

    this.chartDataLocal = new CitiesDoughnutChartDataObject(
      this.canvasId,
      page,
      () => this.drillIn(),
    );

    this.updateNavState(page);
    this.resizeCanvas(page.length);
  }

  private drillIn(): void {
    if (!this.canDrill) {
      return;
    }

    this.level += 1;
    this.renderLevel();
  }

  private renderLevel(): void {
    if (this.chartDataLocal == null) {
      return;
    }

    const page = this.buildPage(this.level);
    this.chartDataLocal.setItems(page);
    this.updateNavState(page);
    this.resizeCanvas(page.length);
  }

  private rebuildPool(): void {
    if (this.chartData == null) {
      this.sortedPool = [];
      this.poolTotal = 0;
      return;
    }

    const pool = this.chartData.items.map((item) => ({
      label: KazakhstanCityEnum.label(item.city),
      value: item.count,
    }));

    if (this.showNoDataArea && this.chartData.noDataCount > 0) {
      pool.push({
        label: "Не указаны данные",
        value: this.chartData.noDataCount,
      });
    }

    pool.sort((a, b) => b.value - a.value);
    this.sortedPool = pool;
    this.poolTotal = pool.reduce((sum, x) => sum + x.value, 0);
  }

  private buildPage(level: number): Array<CitiesChartItem> {
    const offset = this.offsetFor(level);
    const size = level === 0 ? TOP_LEVEL_SIZE : DRILL_LEVEL_SIZE;
    const total = this.poolTotal > 0 ? this.poolTotal : 1;

    const page: Array<CitiesChartItem> = this.sortedPool
      .slice(offset, offset + size)
      .map((x) => ({
        label: x.label,
        value: x.value,
        percent: (x.value / total) * 100,
        isAggregate: false,
      }));

    const tail = this.sortedPool.slice(offset + size);
    if (tail.length >= MIN_AGGREGATE) {
      const tailValue = tail.reduce((sum, x) => sum + x.value, 0);
      page.push({
        label: level === 0 ? "Другие" : "Точнее",
        value: tailValue,
        percent: (tailValue / total) * 100,
        isAggregate: true,
      });
    } else if (tail.length === 1) {
      const only = tail[0];
      page.push({
        label: only.label,
        value: only.value,
        percent: (only.value / total) * 100,
        isAggregate: false,
      });
    }

    return page;
  }

  private offsetFor(level: number): number {
    return level === 0 ? 0 : TOP_LEVEL_SIZE + (level - 1) * DRILL_LEVEL_SIZE;
  }

  private updateNavState(page: Array<CitiesChartItem>): void {
    this.canGoBack = this.level > 0;

    const last = page[page.length - 1];
    this.canDrill = last?.isAggregate === true;
    this.aggregateLabel = this.canDrill ? last.label : "";

    const namedCount = page.filter((x) => !x.isAggregate).length;
    if (namedCount === 0) {
      this.rangeLabel = "";
      return;
    }

    const from = this.offsetFor(this.level) + 1;
    const to = this.offsetFor(this.level) + namedCount;
    this.rangeLabel =
      this.level === 0 ? `Топ ${from}–${to}` : `Места ${from}–${to}`;
  }

  private resizeCanvas(barCount: number): void {
    const chartEl = document.getElementById(this.canvasId);
    if (chartEl != null && chartEl.parentElement != null) {
      const height = Math.max(barCount * 38 + 80, 220);
      chartEl.parentElement.style.height = `${height}px`;
    }
  }
}
