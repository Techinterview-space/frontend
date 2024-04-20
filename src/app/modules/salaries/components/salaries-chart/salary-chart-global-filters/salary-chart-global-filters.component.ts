import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  GlobalFiltersFormGroup,
  SalaryChartGlobalFiltersData,
} from "./global-filters-form-group";
import { SelectItem } from "@shared/select-boxes/select-item";
import {
  KazakhstanCity,
  KazakhstanCityEnum,
} from "@models/salaries/kazakhstan-city";
import { LabelEntityDto } from "@services/label-entity.model";
import { AlertService } from "@shared/components/alert/services/alert.service";

@Component({
  selector: "app-salary-chart-global-filters",
  templateUrl: "./salary-chart-global-filters.component.html",
  styleUrl: "./salary-chart-global-filters.component.scss",
})
export class SalaryChartGlobalFiltersComponent implements OnInit {
  readonly allCities: Array<SelectItem<KazakhstanCity>> =
    KazakhstanCityEnum.options();

  @Input()
  filterData: SalaryChartGlobalFiltersData | null = null;

  @Input()
  professions: Array<LabelEntityDto> = [];

  @Output()
  readonly filtersApplied = new EventEmitter<SalaryChartGlobalFiltersData>();

  @Output()
  readonly filtersReset = new EventEmitter<void>();

  @Output()
  readonly shareClicked = new EventEmitter<SalaryChartGlobalFiltersData>();

  form: GlobalFiltersFormGroup | null = null;
  professionsAsOptions: Array<SelectItem<number>> = [];

  constructor(private readonly alert: AlertService) {}

  ngOnInit(): void {
    this.professionsAsOptions = this.professions.map((x) => {
      return {
        value: x.id.toString(),
        item: x.id,
        label: x.title,
      };
    });

    this.form = new GlobalFiltersFormGroup(this.filterData);
  }

  apply(): void {
    if (!this.form) {
      return;
    }

    const data = this.form.data();
    if (data) {
      this.filtersApplied.emit(data);
    }
  }

  reset(): void {
    if (!this.form) {
      return;
    }

    this.form.reset();
    this.filtersReset.emit();
  }

  share(): void {
    if (!this.form) {
      return;
    }

    const data = this.form.data();
    if (data) {
      this.shareClicked.emit(data);
      this.alert.success(
        "Ссылка скопирована в буфер обмена. Скорее отправляйте ее друзьям!"
      );
    }
  }
}
