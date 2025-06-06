import { Component, Input } from "@angular/core";

@Component({
  selector: "app-error-page-component",
  templateUrl: "./error-page-component.component.html",
  styleUrls: ["./error-page-component.component.scss"],
  standalone: false,
})
export class ErrorPageComponent {
  @Input() errorTitle: string = "";

  @Input() errorTitleCss: string = "text-danger text-center";
}
