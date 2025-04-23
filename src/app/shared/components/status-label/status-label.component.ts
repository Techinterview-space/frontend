import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-status-label",
  templateUrl: "./status-label.component.html",
  standalone: false,
})
export class StatusLabelComponent implements OnInit {
  title = "";
  style = "";

  @Input()
  status: boolean | null = null;

  @Input()
  defaultSuccessTitle = "Active";

  @Input()
  defaultFailTitle = "Inactive";

  ngOnInit(): void {
    if (this.status == null) {
      return;
    }

    this.title =
      this.status === true ? this.defaultSuccessTitle : this.defaultFailTitle;
    this.style = this.status === true ? "success" : "warning text-dark";
  }
}
