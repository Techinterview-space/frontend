import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Company, CompanyEmploymentTypeEnum } from "@models/companies.model";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CompanyReviewForm } from "./company-review-form";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
@Component({
  templateUrl: "./add-review-page.component.html",
  styleUrls: ["./add-review-page.component.scss"],
  standalone: false,
})
export class AddCompanyReviewPageComponent implements OnInit, OnDestroy {
  company: Company | null = null;
  editForm: CompanyReviewForm | null = null;
  confirmCancelMessage: DialogMessage<ConfirmMsg> | null = null;

  readonly options = CompanyEmploymentTypeEnum.options();

  private readonly activateRoute: ActivatedRouteExtended;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute,
    private readonly alertService: AlertService,
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activateRoute
      .getParam("id")
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.service
          .byId(id!)
          .pipe(untilDestroyed(this))
          .subscribe((i) => {
            this.company = i;
            this.title.setTitle(
              `Написать отзыв о компании ${this.company!.name}`,
            );
            this.editForm = new CompanyReviewForm();
          });
      });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  onEditFormSubmit(): void {
    if (!this.editForm || this.company == null) {
      return;
    }

    const request = this.editForm.getRequestOrNull();
    if (!request) {
      return;
    }

    const companyId = this.company.id;
    this.service
      .addCompanyReview(this.company.id, request)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.router.navigate(["/companies", companyId]);
          this.alertService.success(
            "Отзыв успешно добавлен! Он пройдет модерацию и появится на сайте через некоторое время.",
            true
          );
        },
        error: (error) => {
          console.error("Failed to submit review:", error);
          this.alertService.error(
            "Не удалось добавить отзыв. Пожалуйста, попробуйте еще раз.",
          );
        },
      });
  }

  cancel(): void {
    if (this.company == null) {
      return;
    }

    this.confirmCancelMessage = new DialogMessage(
      new ConfirmMsg(
        "Вернуться к компании",
        "Вы уверены, что отменить отзыв? Данные не сохранятся.",
        () => {
          this.router.navigate(["/companies", this.company!.id]);
          this.alertService.success("Отзыв был отменен");
          this.confirmCancelMessage = null;
        },
      ),
    );
  }
}
