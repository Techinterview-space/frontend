import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { SalariesChart } from "../salaries-chart";
import { SurveyService } from "@services/salaries-survey.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

export enum UsefulnessRatingComponentMode {
  UserHasRepliedBefore = "UserHasRepliedBefore",
  ShowRatingBlock = "ShowRatingBlock",
  ShowSuccessBlock = "ShowSuccessBlock",
}

@Component({
  selector: "app-usefulness-rating",
  templateUrl: "./usefulness-rating.component.html",
  styleUrl: "./usefulness-rating.component.scss",
  standalone: false,
})
export class UsefulnessRatingComponent implements OnInit, OnDestroy {
  @Input()
  source: SalariesChart | null = null;

  @Output()
  userReplied: EventEmitter<void> = new EventEmitter<void>();

  currentMode = UsefulnessRatingComponentMode.UserHasRepliedBefore;

  constructor(
    private readonly service: SurveyService,
    private readonly gtag: GoogleAnalyticsService,
  ) {}

  ngOnInit(): void {
    if (this.source == null) {
      return;
    }

    this.currentMode = this.source.hasRecentSurveyReply
      ? UsefulnessRatingComponentMode.UserHasRepliedBefore
      : UsefulnessRatingComponentMode.ShowRatingBlock;
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // Required for untilDestroyed
  }

  ratingChanged(rating: number): void {
    this.service
      .salariesSatGapeReply(rating)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.currentMode = UsefulnessRatingComponentMode.ShowSuccessBlock;
        this.gtag.event("salaries_survey", "rating", rating.toString());
        this.userReplied.emit();
      });
  }
}
