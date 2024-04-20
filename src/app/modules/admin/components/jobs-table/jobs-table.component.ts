import { Component, Input } from "@angular/core";
import { JobItem } from "./job-item";

@Component({
  selector: "app-jobs-table",
  templateUrl: "./jobs-table.component.html",
  styleUrls: ["./jobs-table.component.scss"],
})
export class JobsTableComponent {
  @Input()
  items: Array<JobItem> = [];
}
