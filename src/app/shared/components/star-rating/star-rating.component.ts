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

  rating: number = 0;
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

    this.rating = value.index + 1;
    this.ratingChange.emit(this.rating);
  }

  hoverRating(value: StartRatingObject): void {
    if (this.stars == null) {
      return;
    }

    this.rating = value.index + 1;
    for (const star of this.stars) {
      star.setFilled(this.rating);
    }
  }

  leaveRating(): void {
    if (this.stars == null) {
      return;
    }

    for (const star of this.stars) {
      star.setFilled(this.rating);
    }
  }
}
