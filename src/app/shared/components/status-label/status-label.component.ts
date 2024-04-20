import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-status-label",
  templateUrl: "./status-label.component.html",
})
export class StatusLabelComponent implements OnInit {
  title = "";
  style = "";

  @Input()
  status: boolean | null = null;

  ngOnInit(): void {
    if (this.status == null) {
      return;
    }

    this.title = this.status === true ? "Active" : "Inactive";
    this.style = this.status === true ? "success" : "warning text-dark";
  }
}
