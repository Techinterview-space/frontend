import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  switchMap,
} from "rxjs/operators";
import { Vacancy, VacancyStatusEnum } from "@models/vacancy.model";
import { TitleService } from "@services/title.service";
import { CompaniesService } from "@services/companies.service";
import { VacanciesService } from "@services/vacancies.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { VacancyForm } from "./vacancy-form";

interface CompanyOption {
  id: string;
  name: string;
}

@Component({
  templateUrl: "./vacancy-edit-page.component.html",
  styleUrls: ["./vacancy-edit-page.component.scss"],
  standalone: false,
})
export class VacancyEditPageComponent implements OnInit, OnDestroy {
  readonly statusEnum = VacancyStatusEnum;
  readonly editableStatuses = VacancyStatusEnum.editableStatuses;

  form: VacancyForm | null = null;
  loading: boolean = true;
  saving: boolean = false;
  vacancyId: string | null = null;

  companies: Array<CompanyOption> = [];
  companiesLoading: boolean = false;
  companyInput$ = new Subject<string>();

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  get isEdit(): boolean {
    return this.vacancyId != null;
  }

  constructor(
    private readonly service: VacanciesService,
    private readonly companiesService: CompaniesService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.setupCompanyTypeahead();

    this.vacancyId = this.route.snapshot.paramMap.get("id");
    if (this.vacancyId) {
      this.title.setTitle("Редактирование вакансии");
      this.loadForEdit(this.vacancyId);
    } else {
      this.title.setTitle("Новая вакансия");
      this.form = new VacancyForm(null);
      this.loading = false;
      this.companyInput$.next("");
    }
  }

  private setupCompanyTypeahead(): void {
    this.companyInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          this.companiesLoading = true;
          return this.companiesService
            .all({
              searchQuery: term ?? "",
              page: 1,
              pageSize: 50,
              withRating: false,
            })
            .pipe(finalize(() => (this.companiesLoading = false)));
        }),
        untilDestroyed(this),
      )
      .subscribe((response) => {
        const merged: Array<CompanyOption> = response.results.map((c) => ({
          id: c.id,
          name: c.name,
        }));

        const selectedId = this.form?.value.companyId;
        const selected = this.companies.find((c) => c.id === selectedId);
        if (selected && !merged.some((c) => c.id === selected.id)) {
          merged.unshift(selected);
        }

        this.companies = merged;
      });
  }

  private loadForEdit(id: string): void {
    this.loading = true;
    this.service
      .byId(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (vacancy) => this.initializeForEdit(vacancy),
        error: () => {
          this.alert.error("Вакансия не найдена");
          this.router.navigate(["/vacancies/my"]);
        },
      });
  }

  private initializeForEdit(vacancy: Vacancy): void {
    if (vacancy.deletedAt != null) {
      this.alert.error("Удаленную вакансию нельзя редактировать");
      this.router.navigate(["/vacancies/my"]);
      return;
    }

    this.companies = vacancy.companyId
      ? [
          {
            id: vacancy.companyId,
            name: vacancy.companyName ?? "Прикреплённая компания",
          },
        ]
      : [];
    this.form = new VacancyForm(vacancy);
    this.loading = false;
  }

  submit(): void {
    if (this.form == null) {
      return;
    }

    const request = this.form.requestOrNull();
    if (request == null) {
      return;
    }

    this.saving = true;

    if (this.vacancyId) {
      this.service
        .update(this.vacancyId, request)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.saving = false;
            this.alert.success("Вакансия обновлена");
            this.router.navigate(["/vacancies", this.vacancyId]);
          },
          error: () => (this.saving = false),
        });

      return;
    }

    this.service
      .create(request)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (vacancy) => {
          this.saving = false;
          this.alert.success("Вакансия создана");
          this.router.navigate(["/vacancies", vacancy.id]);
        },
        error: () => (this.saving = false),
      });
  }

  deleteVacancy(): void {
    if (this.vacancyId == null) {
      return;
    }

    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить вакансию",
        "Вы уверены, что хотите удалить вакансию?",
        () => {
          this.service
            .delete(this.vacancyId!)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.confirmDeletionMessage = null;
              this.alert.success("Вакансия удалена");
              this.router.navigate(["/vacancies/my"]);
            });
        },
      ),
    );
  }

  cancel(): void {
    if (this.vacancyId) {
      this.router.navigate(["/vacancies", this.vacancyId]);
    } else {
      this.router.navigate(["/vacancies/my"]);
    }
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
