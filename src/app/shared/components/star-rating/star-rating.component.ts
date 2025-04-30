import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { StartRatingObject } from "./star-rating-object";

@Component({
  selector: "app-star-rating",
  templateUrl: "./star-rating.component.html",
  styleUrls: ["./star-rating.component.scss"],
  standalone: false,
})
export class StarRatingComponent implements OnInit {
  @Input()
  maxValue: number = 5;

  @Output()
  ratingChange = new EventEmitter<number>();

  ratingToShow: number = 0;
  savedRating: number = 0;
  stars: StartRatingObject[] | null = null;

  ngOnInit(): void {
    this.stars = Array.from(
      { length: 5 },
      (_, i) => new StartRatingObject(i, false),
    );
  }

  setRating(value: StartRatingObject) {
    if (this.stars == null) {
      return;
    }

    this.ratingToShow = value.index + 1;
    this.savedRating = this.ratingToShow;

    this.ratingChange.emit(this.savedRating);
  }

  hoverRating(value: StartRatingObject): void {
    if (this.stars == null) {
      return;
    }

    this.ratingToShow = value.index + 1;

    for (const star of this.stars) {
      star.setFilled(this.ratingToShow);
    }
  }

  leaveRating(): void {
    if (this.stars == null) {
      return;
    }

    for (const star of this.stars) {
      star.setFilled(this.savedRating);
    }
  }
}
