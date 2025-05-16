import { Component, Input, OnInit, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-form-progress-bar",
  templateUrl: "./form-progress-bar.component.html",
  styleUrl: "./form-progress-bar.component.scss",
  standalone: false,
})
export class FormProgressBarComponent implements OnInit {
  @Input()
  value: number | null = null;

  @Input()
  maxValue: number | null = null;

  widthInPercent: number | null = null;

  ngOnInit(): void {
    if (this.value != null && this.maxValue != null) {
      this.widthInPercent = Math.round((this.value / this.maxValue) * 100);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"]) {
      this.ngOnInit();
    }
  }
}
