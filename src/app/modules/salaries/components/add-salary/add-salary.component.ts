import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { UserSalariesService } from "@services/user-salaries.service";
import { AddSalaryForm } from "./add-salary-form";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CompanyTypeSelectItem } from "@shared/select-boxes/company-type-select-item";
import { DeveloperGradeSelectItem } from "@shared/select-boxes/developer-grade-select-item";
import { UserSalary } from "@models/salaries/salary.model";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { SelectItem } from "@shared/select-boxes/select-item";
import {
  KazakhstanCity,
  KazakhstanCityEnum,
} from "@models/salaries/kazakhstan-city";
import { LabelEntityDto } from "@services/label-entity.model";

@Component({
  selector: "app-add-salary-modal",
  templateUrl: "./add-salary.component.html",
  styleUrl: "./add-salary.component.scss",
})
export class AddSalaryComponent implements OnInit, OnDestroy {
  @Input()
  skills: Array<LabelEntityDto> = [];

  @Input()
  industries: Array<LabelEntityDto> = [];

  @Input()
  professions: Array<LabelEntityDto> = [];

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  @Output()
  salaryAdded: EventEmitter<UserSalary> = new EventEmitter();

  addSalaryForm: AddSalaryForm | null = null;
  errorMessage: string | null = null;

  readonly companyTypes: Array<CompanyTypeSelectItem> =
    CompanyTypeSelectItem.allItems();
  readonly grades: Array<DeveloperGradeSelectItem> =
    DeveloperGradeSelectItem.gradesSimpleOnly();
  readonly cities: Array<SelectItem<KazakhstanCity>> =
    KazakhstanCityEnum.options();

  skillsAsOptions: Array<SelectItem<number>> = [];
  industriesAsOptions: Array<SelectItem<number>> = [];
  professionsAsOptions: Array<SelectItem<number>> = [];

  constructor(
    private readonly service: UserSalariesService,
    private readonly alert: AlertService
  ) {}

  ngOnInit(): void {
    this.skillsAsOptions = this.skills.map((x) => {
      return {
        value: x.id.toString(),
        item: x.id,
        label: x.title,
      };
    });

    this.industriesAsOptions = this.industries.map((x) => {
      return {
        value: x.id.toString(),
        item: x.id,
        label: x.title,
      };
    });

    const professionIdToSkip = 1;
    this.professionsAsOptions = this.professions
      .filter((x) => x.id !== professionIdToSkip)
      .map((x) => {
        return {
          value: x.id.toString(),
          item: x.id,
          label: x.title,
        };
      });

    this.addSalaryForm = new AddSalaryForm(null, this.industries.length > 0);
  }

  addSalarySubmitAction(): void {
    this.errorMessage = null;
    const data = this.addSalaryForm?.createRequestOrNull();
    if (data == null) {
      return;
    }

    this.service
      .create(data)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        if (x.isSuccess && x.createdSalary) {
          this.errorMessage = null;
          this.alert.success("Зарплата успешно записана");
          this.salaryAdded.emit(x.createdSalary);
        } else {
          const error = "За данный квартал уже есть запись";
          this.alert.error(error);
          this.errorMessage = error;
        }
      });
  }

  ngOnDestroy(): void {
    // ignored
  }

  close(): void {
    this.closed.emit();
  }
}
