import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PaginatedList } from '@models/paginated-list';
import { UserSalary } from '@models/salaries/salary.model';
import { SelectBoxItemsResponse, UserSalariesService } from '@services/user-salaries.service';
import { SalaryChartGlobalFiltersData } from '../salaries-chart/salary-chart-global-filters/global-filters-form-group';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { SalaryTableRow } from './salary-table-row';
import { LabelEntityDto } from '@services/label-entity.model';

@Component({
  selector: 'app-salaries-paginated-table',
  templateUrl: './salaries-paginated-table.component.html'
})
export class SalariesPaginatedTableComponent implements OnInit, OnDestroy {

  readonly defaultPageSize = 15;

  items: Array<SalaryTableRow> | null = null;

  @Input()
  skills: Array<LabelEntityDto> = [];

  @Input()
  industries: Array<LabelEntityDto> = [];

  @Input()
  professions: Array<LabelEntityDto> = [];

  @Input()
  filter: SalaryChartGlobalFiltersData | null = null;

  source: PaginatedList<UserSalary> | null = null;
  private currentPage = 1;

  constructor(
    private readonly service: UserSalariesService,
  ) {}

  ngOnInit(): void {
    this.loadData(this.currentPage);
  }

  loadData(page = 1): void {
    this.items = null;
    this.source = null;
    this.currentPage = page;

    this.service
      .allPaginated({
        page,
        pageSize: this.defaultPageSize,
        profsInclude: this.filter?.profsInclude ?? [],
        grade: this.filter?.grade ?? null,
        cities: this.filter?.cities ?? [],
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.items = x.results.map((x) => new SalaryTableRow(
          x,
          this.professions ?? [],
          this.skills ?? [],
          this.industries ?? []));
        this.source = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }
}
