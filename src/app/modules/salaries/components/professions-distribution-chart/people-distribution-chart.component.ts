import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import {
  PeopleDistributionChartObject,
  ProfessionsChartItem,
} from "./people-distribution-chart-object";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { ProfessionDistributionData } from "@services/user-salaries.service";

// Level 0 shows the most common specializations; each deeper level pages
// through the remaining tail. The aggregate bar only appears when it would
// collapse at least two entries, so a lone leftover keeps its own named bar.
const TOP_LEVEL_SIZE = 7;
const DRILL_LEVEL_SIZE = 6;

class TableRow {
  constructor(
    readonly title: string,
    readonly value: number,
    readonly percent: number,
  ) {}
}

// One professions chart (Kazakhstan or remote): owns its drill level, the
// rendered chart, and the expandable data table. Two of these run side by side.
class ProfessionsDrillChart {
  showTable = false;
  tableRows: Array<TableRow>;
  totalCount: number;

  canGoBack = false;
  canDrill = false;
  aggregateLabel = "";
  rangeLabel = "";

  private chart: PeopleDistributionChartObject | null = null;
  private level = 0;
  private readonly sortedPool: Array<{ label: string; value: number }>;
  private readonly backendOtherPercentage: number;
  private readonly hasBackendOther: boolean;

  constructor(
    private readonly canvasId: string,
    data: ProfessionDistributionData,
    private readonly title: string,
  ) {
    this.totalCount = data.totalCount;
    this.backendOtherPercentage = data.otherPercentage;
    this.hasBackendOther = data.otherCount > 0;

    this.sortedPool = data.items
      .map((x) => ({ label: x.profession.title, value: x.percentage }))
      .sort((a, b) => b.value - a.value);

    this.tableRows = data.items
      .map((x) => new TableRow(x.profession.title, x.count, x.percentage))
      .sort((a, b) => b.percent - a.percent);
    if (this.hasBackendOther) {
      this.tableRows.push(
        new TableRow("Другие", data.otherCount, data.otherPercentage),
      );
    }

    this.updateNavState(this.buildPage(this.level));
  }

  attach(): void {
    const page = this.buildPage(this.level);
    this.chart = new PeopleDistributionChartObject(
      this.canvasId,
      page,
      this.title,
      () => this.drillIn(),
    );
    this.resizeCanvas(page.length);
  }

  goBack(): void {
    if (this.level === 0) {
      return;
    }

    this.level -= 1;
    this.render();
  }

  private drillIn(): void {
    if (!this.canDrill) {
      return;
    }

    this.level += 1;
    this.render();
  }

  private render(): void {
    if (this.chart == null) {
      return;
    }

    const page = this.buildPage(this.level);
    this.chart.setItems(page);
    this.updateNavState(page);
    this.resizeCanvas(page.length);
  }

  private buildPage(level: number): Array<ProfessionsChartItem> {
    const offset = this.offsetFor(level);
    const size = level === 0 ? TOP_LEVEL_SIZE : DRILL_LEVEL_SIZE;

    const page: Array<ProfessionsChartItem> = this.sortedPool
      .slice(offset, offset + size)
      .map((x) => ({
        label: x.label,
        value: x.value,
        isAggregate: false,
        drillable: false,
      }));

    const tail = this.sortedPool.slice(offset + size);

    if (tail.length === 0) {
      // Only the backend's pre-aggregated residual may be left — show it as a
      // muted, non-clickable terminal bucket.
      if (this.hasBackendOther) {
        page.push({
          label: "Другие",
          value: this.backendOtherPercentage,
          isAggregate: true,
          drillable: false,
        });
      }
      return page;
    }

    if (tail.length === 1 && !this.hasBackendOther) {
      const only = tail[0];
      page.push({
        label: only.label,
        value: only.value,
        isAggregate: false,
        drillable: false,
      });
      return page;
    }

    const tailValue =
      tail.reduce((sum, x) => sum + x.value, 0) +
      (this.hasBackendOther ? this.backendOtherPercentage : 0);
    page.push({
      label: level === 0 ? "Другие" : "Точнее",
      value: tailValue,
      isAggregate: true,
      drillable: true,
    });
    return page;
  }

  private offsetFor(level: number): number {
    return level === 0 ? 0 : TOP_LEVEL_SIZE + (level - 1) * DRILL_LEVEL_SIZE;
  }

  private updateNavState(page: Array<ProfessionsChartItem>): void {
    this.canGoBack = this.level > 0;

    const last = page[page.length - 1];
    this.canDrill = last?.drillable === true;
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
      const height = Math.max(barCount * 38 + 90, 220);
      chartEl.parentElement.style.height = `${height}px`;
    }
  }
}

@Component({
  selector: "app-people-distribution-chart",
  templateUrl: "./people-distribution-chart.component.html",
  styleUrl: "./people-distribution-chart.component.scss",
  standalone: false,
})
export class PeopleDistributionChartComponent implements OnInit, AfterViewInit {
  @Input()
  chart: SalariesChart | null = null;

  local: ProfessionsDrillChart | null = null;
  remote: ProfessionsDrillChart | null = null;

  readonly canvasIdLocal = "canvas_" + Math.random().toString(36);
  readonly canvasIdRemote = "canvas_" + Math.random().toString(36);

  constructor() {}

  ngOnInit(): void {
    const chartData = this.chart?.professionsDistributionChartData;
    if (chartData == null) {
      return;
    }

    if (chartData.localData.totalCount > 0) {
      this.local = new ProfessionsDrillChart(
        this.canvasIdLocal,
        chartData.localData,
        "Казахстан",
      );
    }

    if (chartData.remoteData.totalCount > 0) {
      this.remote = new ProfessionsDrillChart(
        this.canvasIdRemote,
        chartData.remoteData,
        "Мир (удаленка)",
      );
    }
  }

  ngAfterViewInit(): void {
    this.local?.attach();
    this.remote?.attach();
  }
}
