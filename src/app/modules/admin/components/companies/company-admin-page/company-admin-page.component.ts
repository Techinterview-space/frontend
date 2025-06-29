import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Company, CompanyReview } from "@models/companies.model";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { EditCompanyForm } from "../shared/edit-company-form";

@Component({
  templateUrl: "./company-admin-page.component.html",
  styleUrls: ["./company-admin-page.component.scss"],
  standalone: false,
})
export class CompanyAdminPageComponent implements OnInit, OnDestroy {
  company: Company | null = null;
  reviewToShow: CompanyReview | null = null;
  confirmMessage: DialogMessage<ConfirmMsg> | null = null;
  editForm: EditCompanyForm | null = null;
  companyDescription: string | null = null;

  private readonly activateRoute: ActivatedRouteExtended;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
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
          .byIdForAdmin(id!)
          .pipe(untilDestroyed(this))
          .subscribe((i) => {
            this.company = i;
            this.companyDescription = this.company!.description?.replace(
              /\n/g,
              "<br />",
            );

            this.company!.reviews.forEach((r) => {
              r.pros = r.pros?.replace(/\n/g, "<br />");
              r.cons = r.cons?.replace(/\n/g, "<br />");
            });

            this.title.setTitle(`Компания ${this.company!.name}`);
          });
      });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  openEditForm(): void {
    this.editForm = new EditCompanyForm(this.company);
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  onEditFormSubmit(): void {
    if (this.editForm == null || this.company == null) {
      return;
    }

    const editRequest = this.editForm.editRequestOrNull();
    if (editRequest == null) {
      return;
    }

    this.service
      .update(this.company.id, editRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alertService.success("Компания была обновлена");
        this.editForm = null;
        this.ngOnInit();
      });
  }

  recalculateRating(): void {
    throw new Error("Not implemented");
  }

  runAiAnalysis(): void {
    if (this.company == null) {
      return;
    }

    this.service
      .getOpenAiAnalysis(this.company.id)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.alertService.success("AI анализ был завершен");
        this.company = null;
        this.ngOnInit();
    });
  }

  onReviewModalDlgClose(): void {
    this.reviewToShow = null;
  }

  onReviewModalDlgOpen(review: CompanyReview): void {
    this.reviewToShow = review;
  }

  approveReview(review: CompanyReview): void {
    if (this.company == null) {
      return;
    }

    const companyId = this.company.id!;
    this.confirmMessage = new DialogMessage(
      new ConfirmMsg(
        "Одобрить отзыв",
        "Вы уверены, что одобрить отзыв? Он будет включен в рейтинг компании.",
        () => {
          this.service
            .approveReview(companyId, review.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alertService.success("Отзыв был одобрен");
              this.confirmMessage = null;
              this.ngOnInit();
            });
        },
      ),
    );
  }

  outdateReview(review: CompanyReview): void {
    if (this.company == null) {
      return;
    }

    const companyId = this.company.id!;
    this.confirmMessage = new DialogMessage(
      new ConfirmMsg(
        "Отозвать отзыв",
        "Вы уверены, что отозвать отзыв? Он будет исключен из рейтинга компании, рейтинг будет пересчитан.",
        () => {
          this.service
            .outdateReview(companyId, review.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alertService.success("Отзыв был отозван");
              this.confirmMessage = null;
              this.ngOnInit();
            });
        },
      ),
    );
  }
}
