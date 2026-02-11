import { Component, OnDestroy, OnInit } from "@angular/core";
import { CompanyReview } from "@models/companies.model";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";

@Component({
  templateUrl: "./reviews-to-approve-page.component.html",
  styleUrls: ["./reviews-to-approve-page.component.scss"],
  standalone: false,
})
export class ReviewsToApprovePageComponent implements OnInit, OnDestroy {
  reviews: Array<CompanyReview> | null = null;
  confirmMessage: DialogMessage<ConfirmMsg> | null = null;
  reviewToShow: CompanyReview | null = null;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
  ) {
    this.title.setTitle("Отзывы на модерацию");
  }

  ngOnInit(): void {
    this.reviews = null;

    this.service
      .reviewsToApprove()
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.reviews = i;
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
    this.confirmMessage = new DialogMessage(
      new ConfirmMsg(
        "Одобрить отзыв",
        "Вы уверены, что одобрить отзыв? Он будет включен в рейтинг компании.",
        () => {
          this.service
            .approveReview(review.companyId, review.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success("Отзыв был одобрен");
              this.confirmMessage = null;
              this.ngOnInit();
            });
        },
      ),
    );
  }

  deleteReview(review: CompanyReview): void {
    this.confirmMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить отзыв",
        "Вы уверены, что удалить отзыв? Его нельзя будет восстановить.",
        () => {
          this.service
            .deleteReview(review.companyId, review.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success("Отзыв был удален");
              this.confirmMessage = null;
              this.ngOnInit();
            });
        },
      ),
    );
  }
}
