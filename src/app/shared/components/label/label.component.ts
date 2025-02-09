import { Component, Input, OnInit } from "@angular/core";
import { Label } from "@models/user-label.model";

@Component({
    selector: "app-label",
    templateUrl: "./label.component.html",
    styleUrls: ["./label.component.scss"],
    standalone: false
})
export class LabelComponent implements OnInit {
  @Input()
  label: Label | null = null;

  ngOnInit(): void {}
}
