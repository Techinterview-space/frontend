import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { SpinnerService } from "@shared/services/spinners/spinner-service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  selector: "app-spinner",
  templateUrl: "./app-spinner.component.html",
  styleUrls: ["./app-spinner.component.scss"],
  standalone: false,
})
export class AppSpinnerComponent implements OnInit, OnDestroy {
  @Input() name!: string;
  @Input() bdOpacity: string = "0.3";
  @Input() bdColor: string = "rgba(51,51,51,0.91)";
  @Input() color: string = "#fff";
  @Input() fullScreen: boolean = true;

  isVisible = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService
      .getVisibility$(this.name)
      .pipe(untilDestroyed(this))
      .subscribe((visible) => {
        this.isVisible = visible;
      });
  }

  ngOnDestroy(): void {}
}
