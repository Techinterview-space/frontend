import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { UserSalariesService } from "@services/user-salaries.service";
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
import { Router } from "@angular/router";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { AuthService } from "@shared/services/auth/auth.service";
import { pipe } from "rxjs";
import { EditSalaryForm } from "./edit-salary-form";
import { Gender, GenderEnum } from "@models/enums/gender.enum";
import { CookieService } from "ngx-cookie-service";

@Component({
  templateUrl: "./add-salary.component.html",
  styleUrl: "./add-salary.component.scss",
  standalone: false,
})
export class AddSalaryComponent implements OnInit, OnDestroy {
  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  @Output()
  salaryAdded: EventEmitter<UserSalary> = new EventEmitter();

  professions: Array<LabelEntityDto> = [];
  industries: Array<LabelEntityDto> = [];
  skills: Array<LabelEntityDto> = [];

  addSalaryForm: EditSalaryForm | null = null;
  errorMessage: string | null = null;
  isAuthenticated = false;

  currentStep = 1;

  readonly companyTypes: Array<CompanyTypeSelectItem> =
    CompanyTypeSelectItem.allItems();
  readonly grades: Array<DeveloperGradeSelectItem> =
    DeveloperGradeSelectItem.gradesSimpleOnly();
  readonly cities: Array<SelectItem<KazakhstanCity>> =
    KazakhstanCityEnum.options();
  readonly genders: Array<SelectItem<Gender>> = GenderEnum.options();
  readonly currentYear = new Date().getFullYear();

  skillsAsOptions: Array<SelectItem<number>> = [];
  industriesAsOptions: Array<SelectItem<number>> = [];
  professionsAsOptions: Array<SelectItem<number>> = [];

  constructor(
    private readonly service: UserSalariesService,
    private readonly alert: AlertService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly gtag: GoogleAnalyticsService,
    private readonly cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      console.log("set url", this.router.url);
      this.cookieService.set("url", this.router.url);

      this.authService
        .login()
        .pipe(untilDestroyed(this))
        .subscribe((x) => {});

      return;
    }

    this.service
      .selectBoxItems()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.professions = x.professions;
        this.industries = x.industries;
        this.skills = x.skills;

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

        this.currentStep = 1;
        this.addSalaryForm = new EditSalaryForm(
          null,
          this.industries.length > 0,
          true,
        );
      });
  }

  previousStep(): void {
    if (this.currentStep === 1) {
      return;
    }

    this.currentStep = this.currentStep - 1;
  }

  nextStep(): void {
    if (this.currentStep === 3) {
      this.addSalarySubmitAction();
      return;
    }

    this.currentStep = this.currentStep + 1;
  }

  addSalarySubmitAction(): void {
    this.errorMessage = null;
    const data = this.addSalaryForm?.createAddRequestOrNull();
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
          this.gtag.event("salary_added", "salary_chart");
          this.router.navigateByUrl("/salaries");
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
}
