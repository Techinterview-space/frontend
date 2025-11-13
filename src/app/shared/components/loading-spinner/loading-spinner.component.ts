import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
  standalone: false,
})
export class LoadingSpinnerComponent {
  @Input()
  style = "spinner-border-lg";

  showPreloader = false;
}
