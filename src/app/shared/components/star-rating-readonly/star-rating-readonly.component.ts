import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-star-rating-readonly",
  templateUrl: "./star-rating-readonly.component.html",
  styleUrls: ["./star-rating-readonly.component.scss"],
  standalone: false,
})
export class StarRatingReadonlyComponent implements OnInit {
  @Input() source = 0;
  @Input() maxStars = 5;

  fullStars: number[] = [];
  hasHalfStar = false;
  emptyStars: number[] = [];

  ngOnInit() {
    const fullStarCount = Math.floor(this.source);
    const hasHalf =
      this.source - fullStarCount >= 0.25 && this.source - fullStarCount < 0.75;
    const totalStars = this.maxStars;

    this.fullStars = Array(fullStarCount).fill(0);
    this.hasHalfStar = hasHalf;

    const emptyCount = totalStars - fullStarCount - (hasHalf ? 1 : 0);
    this.emptyStars = Array(emptyCount).fill(0);
  }
}
