import { Component, Input, OnInit } from "@angular/core";
import { AverageRatingData } from "../../../../services/admin-dashboard.service";

@Component({
  selector: "app-rating-page",
  templateUrl: "./rating-page.component.html",
  styleUrls: ["./rating-page.component.scss"],
  standalone: false,
})
export class RatingPageComponent implements OnInit {
  averageRating: number = 0;
  count: number = 0;

  @Input()
  source: AverageRatingData | null = null;

  ngOnInit(): void {
    if (this.source) {
      this.averageRating = this.source.averageRating;
      this.count = this.source.count;
    }
  }
}
