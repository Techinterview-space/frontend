import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-add-salary-progress-bar",
  templateUrl: "./add-salary-progress-bar.component.html",
  styleUrl: "./add-salary-progress-bar.component.scss",
})
export class AddSalaryProgrssBarComponent implements OnInit {
  @Input()
  value: number | null = null;

  @Input()
  maxValue: number | null = null;

  widthInPercent: number | null = null;

  ngOnInit(): void {
    if (this.value != null && this.maxValue != null) {
      this.widthInPercent = Math.round((this.value / this.maxValue) * 100);
      console.log(this.widthInPercent);
    }
  }
}
