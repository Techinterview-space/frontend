import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { UserSalaryAdminDto } from "@models/salaries/salary.model";
import { TitleService } from "@services/title.service";
import {
  AdminAllSalariesQueryParams,
  UserSalariesService,
} from "@services/user-salaries.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { SalaryAdminItem } from "../salary-admin-item";
import { SalariesTableFilter } from "../salaries-table-filter";
import { LabelEntityDto } from "@services/label-entity.model";

@Component({
    templateUrl: "./salaries-admin-page.component.html",
    standalone: false
})
export class SalariesAdminPageComponent implements OnInit, OnDestroy {
  salaries: Array<SalaryAdminItem> | null = null;
  source: PaginatedList<UserSalaryAdminDto> | null = null;
  professions: Array<LabelEntityDto> = [];
  skills: Array<LabelEntityDto> = [];
  industries: Array<LabelEntityDto> = [];

  filter: SalariesTableFilter | null = null;
  currentPage: number = 1;

  constructor(
    private readonly service: UserSalariesService,
    titleService: TitleService,
    private readonly alert: AlertService
  ) {
    titleService.setTitle("Анкеты в статистике");
  }

  ngOnInit(): void {
    this.salaries = null;
    this.source = null;

    this.service
      .selectBoxItems()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.professions = x.professions;
        this.skills = x.skills;
        this.industries = x.industries;

        this.filter = new SalariesTableFilter(this.professions);
        this.loadData({
          page: this.currentPage,
          pageSize: defaultPageParams.pageSize,
          ...this.filter,
        });
      });
  }

  loadData(data: AdminAllSalariesQueryParams): void {
    this.salaries = null;
    this.source = null;
    this.currentPage = data.page;

    this.service
      .allAdminPaginated(data)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.salaries = x.results.map(
          (x) =>
            new SalaryAdminItem(
              x,
              this.professions,
              this.skills,
              this.industries
            )
        );
        this.source = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }

  deleteSalary(salary: SalaryAdminItem): void {
    this.service
      .delete(salary.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Salary deleted");
        this.ngOnInit();
      });
  }

  excludeSalary(salary: SalaryAdminItem): void {
    this.service
      .excludeFromStats(salary.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Salary excluded from stats");
        this.ngOnInit();
      });
  }
}
