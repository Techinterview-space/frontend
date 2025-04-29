import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-star-rating-readonly",
  templateUrl: "./star-rating-readonly.component.html",
  styleUrls: ["./star-rating-readonly.component.scss"],
  standalone: false,
})
export class StarRatingReadonlyComponent {
  readonly stars: number[] = [1, 2, 3, 4, 5];

  count: number = 0;

  @Input()
  source: number | null = null;
}
