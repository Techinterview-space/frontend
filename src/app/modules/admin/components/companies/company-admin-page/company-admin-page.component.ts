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

@Component({
  templateUrl: "./company-admin-page.component.html",
  styleUrls: ["./company-admin-page.component.scss"],
  standalone: false,
})
export class CompanyAdminPageComponent implements OnInit, OnDestroy {
  company: Company | null = null;
  reviewToShow: CompanyReview | null = null;
  confirmMessage: DialogMessage<ConfirmMsg> | null = null;

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
          .byId(id!)
          .pipe(untilDestroyed(this))
          .subscribe((i) => {
            this.company = i;
            this.title.setTitle(`Компания ${this.company!.name}`);
          });
      });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
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
