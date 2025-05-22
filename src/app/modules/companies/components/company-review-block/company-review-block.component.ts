import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CompanyReview } from "@models/companies.model";

@Component({
  selector: "app-company-review-block",
  templateUrl: "./company-review-block.component.html",
  styleUrls: ["./company-review-block.component.scss"],
  standalone: false,
})
export class CompanyReviewBlockComponent implements OnInit {
  @Input()
  review: CompanyReview | null = null;

  @Input()
  showVoteButtons: boolean = true;

  @Output()
  like: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  dislike: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  clickWhileDisabledForAnonymous: EventEmitter<void> = new EventEmitter<void>();

  pros: string | null = null;
  cons: string | null = null;

  ngOnInit(): void {
    if (this.review == null) {
      return;
    }

    this.pros = this.review.pros?.replace(/\n/g, "<br />");
    this.cons = this.review.cons?.replace(/\n/g, "<br />");
  }

  likeClicked(): void {
    this.like.emit();
  }

  dislikeCliked(): void {
    this.dislike.emit();
  }

  clickWhileDisabledForAnonymousClick(): void {
    this.clickWhileDisabledForAnonymous.emit();
  }
}
